<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Solarium\Client;

class ProvidersController extends Controller
{
    public function index(Request $request, Client $solrClient): Response
    {
        // body has no id or class on index page

        $providersMap = $this->fetchProviderNidsMapping($request, $solrClient);

        return Inertia::render('ProviderIndex', ['providersMap' => $providersMap]);
    }

    public function show($id, Request $request, Client $solrClient): Response
    {
        $bodyId = 'providers-'.$id;

        $data = $this->fetchSolrDataByPID($request, $solrClient, $id);

        // just check first book, we only need the alias once
        $idAlias = null;
        $firstBookProvider = $data['docs'][0];
        if (isset($firstBookProvider['sm_provider_nid']) && $firstBookProvider['sm_provider_nid'][0] === $id) {
            $idAlias = $firstBookProvider['sm_provider_label'][0];
        } else {
            $idAlias = $id;
        }

        return Inertia::render('ProviderPID', ['bodyId' => $bodyId, 'data' => $data, 'idAlias' => $idAlias]);
    }

    private function fetchSolrDataByPID(Request $request, Client $solrClient, $providerPID)
    {
        $page = (int) $request->input('page', 1);
        $rows = 12;
        $start = ($page - 1) * $rows;

        $providerPID = (int) $providerPID;
        $queryText = "sm_provider_nid:($providerPID)";

        $sortField = $request->input('sortfield', 'ss_longlabel');

        $collectionCode = 'awdl OR egypt';

        $fields = [
            'ss_book_identifier',
            'ss_uri',
            'ss_title_long',
            'sm_author',
            'zm_series_data_x',
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
                'ss_book_identifier' => $doc->ss_book_identifier,
                'ss_title_long' => $doc->ss_title_long,
                'sm_author' => $doc->sm_author,
                'zm_series_data_x' => $doc->zm_series_data_x,
                'sm_publisher' => $doc->sm_publisher,
                'sm_field_publication_location' => $doc->sm_field_publication_location,
                'ss_publication_date_text' => $doc->ss_publication_date_text,
                'sm_provider_nid' => $doc->sm_provider_nid,
                'sm_provider_label' => $doc->sm_provider_label,
                'im_field_subject' => $doc->im_field_subject,
                'sm_subject_label' => $doc->sm_subject_label,
                'bs_status' => $doc->bs_status,
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

    // facet for unique provider nids for index page
    private function fetchProviderNidsMapping(Request $request, Client $solrClient): array
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

        // get unique provider nids
        $facetSet = $query->getFacetSet();
        $facetSet->createFacetField('provider_nids')
            ->setField('sm_provider_nid')
            // removes limit of unique fields found
            ->setLimit(-1)
            ->setMinCount(1);

        $resultset = $solrClient->select($query);
        $facet = $resultset->getFacetSet()->getFacet('provider_nids');

        $uniqueNids = [];
        foreach ($facet as $value => $count) {
            $uniqueNids[] = $value;
        }

        // map all unique nids to labels
        $labelQuery = $solrClient->createSelect();
        $labelQuery->setQuery('*:*');
        // select all items to check for all unique values
        $labelQuery->setRows(470);
        $labelQuery->setFields(['sm_provider_nid', 'sm_provider_label']);

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

        $nidToLabelMap = [];
        foreach ($labelResultset as $doc) {
            if (isset($doc->sm_provider_nid) && is_array($doc->sm_provider_nid)
                && isset($doc->sm_provider_label) && is_array($doc->sm_provider_label)) {

                // match id to label
                foreach ($doc->sm_provider_nid as $index => $providerNid) {
                    // store if we don't already have a label for this id
                    if (! isset($nidToLabelMap[$providerNid])
                        && isset($doc->sm_provider_label[$index])) {
                        $nidToLabelMap[$providerNid] = $doc->sm_provider_label[$index];
                    }
                }
            }
        }

        $providersWithLabels = [];
        foreach ($uniqueNids as $nid) {
            $providersWithLabels[] = [
                'nid' => $nid,
                'label' => $nidToLabelMap[$nid] ?? 'Unknown',
            ];
        }

        usort($providersWithLabels, function ($a, $b) {
            return (int) $a['nid'] <=> (int) $b['nid'];
        });

        return $providersWithLabels;
    }

    private function decodeJsonArray(?array $values): array
    {
        if (! $values) {
            return [];
        }

        return array_map(function ($value) {
            $decoded = json_decode($value, true);

            return json_last_error() === JSON_ERROR_NONE ? $decoded : $value;
        }, $values);
    }
}
