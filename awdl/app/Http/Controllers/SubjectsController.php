<?php

namespace App\Http\Controllers;

use App\Helpers\JsonHelper;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Solarium\Client;

class SubjectsController extends Controller
{
    public function index(Request $request, Client $solrClient): Response
    {

        // body has no id or class on index page

        $subjectsMap = $this->fetchSubjectIdsMapping($request, $solrClient);

        return Inertia::render('SubjectIndex', ['subjectsMap' => $subjectsMap]);

    }

    public function show($id, Request $request, Client $solrClient): Response
    {
        $bodyId = 'subjects-pages-'.$id;

        $data = $this->fetchSolrDataByPID($request, $solrClient, $id);

        // just check first book, we only need the alias once
        $idAlias = null;
        $firstBook = $data['docs'][0];
        if (isset($firstBook['zm_subject']) && is_array($firstBook['zm_subject'])) {
            for ($i = 0; $i < count($firstBook['zm_subject']); $i++) {
                if (isset($firstBook['zm_subject'][$i]['tid']) && $firstBook['zm_subject'][$i]['tid'] === $id) {
                    $idAlias = $firstBook['zm_subject'][$i]['name'];
                    break;
                }
            }
        } else {
            $idAlias = $id;
        }

        return Inertia::render('SubjectPID', ['bodyId' => $bodyId, 'data' => $data, 'idAlias' => $idAlias]);

    }

    private function fetchSolrDataByPID(Request $request, Client $solrClient, $subjectPID)
    {
        $page = (int) $request->input('page', 1);
        $rows = 12;
        $start = ($page - 1) * $rows;

        $subjectPID = (int) $subjectPID;
        $queryText = "im_field_subject:$subjectPID";

        $sortField = $request->input('sortfield', 'ss_longlabel');

        $collectionCode = 'awdl OR egypt';

        $fields = [
            'ss_book_identifier',
            'ss_uri',
            'ss_title_long',
            'sm_author',
            'sm_publisher',
            'sm_field_publication_location',
            'ss_publication_date_text',
            'iass_timestamp',
            'sm_provider_nid',
            'sm_provider_label',
            'im_field_subject',
            'sm_subject_label',
            'sm_collection_identifier',
            'bs_status',
            'zm_series_data_x',
            'zm_subject',
        ];

        $query = $solrClient->createSelect();

        $query->setQuery($queryText);

        $query->addFilterQuery([
            'key' => 'bundle_filter',
            'query' => 'bundle:dlts_book',
        ]);

        $query->addFilterQuery([
            'key' => 'collection_code_filter',
            'query' => 'sm_collection_code:('.$collectionCode.')',
        ]);

        $query->addFilterQuery([
            'key' => 'status',
            'query' => 'bs_status:1',
        ]);

        $query->setFields($fields);

        $query->setStart($start);

        $query->setRows($rows);

        $query->addSort($sortField, $query::SORT_ASC);

        $resultset = $solrClient->select($query);

        $docs = [];

        foreach ($resultset as $doc) {
            $docs[] = [
                'identifier' => $doc->ss_book_identifier,
                'title' => $doc->ss_title_long ?: 'N.A.',
                'authors' => $doc->sm_author ?: [],
                'seriesData' => JsonHelper::decodeJsonArray($doc->zm_series_data_x),
                'publisher' => JsonHelper::decodeHtmlEntitiesRecursive($doc->sm_publisher[0] ?: 'N.A.'),
                'publicationPlace' => $doc->sm_field_publication_location,
                'publicationDate' => $doc->ss_publication_date_text ?: 'N.A.',
                'providerIds' => $doc->sm_provider_nid,
                'providerLabels' => $doc->sm_provider_label,
                'subjectIds' => $doc->im_field_subject,
                'subjectLabels' => $doc->sm_subject_label,
                'bs_status' => $doc->bs_status,
                'zm_subject' => JsonHelper::decodeJsonArray($doc->zm_subject),
            ];
        }

        $numFound = $resultset->getNumFound();

        return [
            'start' => $start,
            'rows' => $rows,
            'docs' => $docs,
            'numFound' => $numFound,
            'queryText' => $queryText,
            'sortField' => $sortField,
        ];
    }

    private function fetchSubjectIdsMapping(Request $request, Client $solrClient): array
    {
        $query = $solrClient->createSelect();
        $query->setQuery('*:*');
        $query->setRows(0);

        $collectionCode = 'awdl OR egypt';

        $query->addFilterQuery([
            'key' => 'bundle_filter',
            'query' => 'bundle:dlts_book',
        ]);

        $query->addFilterQuery([
            'key' => 'collection_code_filter',
            'query' => 'sm_collection_code:('.$collectionCode.')',
        ]);

        $query->addFilterQuery([
            'key' => 'status',
            'query' => 'bs_status:1',
        ]);

        // get unique subject ids
        $facetSet = $query->getFacetSet();
        $facetSet->createFacetField('subject_ids')
            ->setField('im_field_subject')
            // removes limit of unique fields found
            ->setLimit(-1)
            ->setMinCount(1);

        $resultset = $solrClient->select($query);
        $numFound = $resultset->getNumFound();
        $facet = $resultset->getFacetSet()->getFacet('subject_ids');

        $uniqueIds = [];
        foreach ($facet as $value => $count) {
            $uniqueIds[] = $value;
        }

        // map all unique ids to labels
        $labelQuery = $solrClient->createSelect();
        $labelQuery->setQuery('*:*');
        // select all items to check for all unique values
        $labelQuery->setRows($numFound);
        $labelQuery->setFields(['im_field_subject', 'sm_subject_label']);

        $labelQuery->addFilterQuery([
            'key' => 'bundle_filter',
            'query' => 'bundle:dlts_book',
        ]);

        $labelQuery->addFilterQuery([
            'key' => 'collection_code_filter',
            'query' => 'sm_collection_code:('.$collectionCode.')',
        ]);

        $labelQuery->addFilterQuery([
            'key' => 'status',
            'query' => 'bs_status:1',
        ]);

        $labelResultset = $solrClient->select($labelQuery);

        $idToLabelMap = [];
        foreach ($labelResultset as $doc) {
            if (isset($doc->im_field_subject) && is_array($doc->im_field_subject)
                && isset($doc->sm_subject_label) && is_array($doc->sm_subject_label)) {

                // match id to label
                foreach ($doc->im_field_subject as $index => $subjectId) {
                    // store if we don't already have a label for this ID
                    if (! isset($idToLabelMap[$subjectId])
                        && isset($doc->sm_subject_label[$index])) {
                        $idToLabelMap[$subjectId] = $doc->sm_subject_label[$index];
                    }
                }
            }
        }

        $subjectsWithLabels = [];
        foreach ($uniqueIds as $id) {
            $subjectsWithLabels[] = [
                'nid' => $id,
                'label' => $idToLabelMap[$id] ?? 'Unknown',
            ];
        }

        // sort by id numerically
        usort($subjectsWithLabels, function ($a, $b) {
            return (int) $a['nid'] <=> (int) $b['nid'];
        });

        return $subjectsWithLabels;

    }
}
