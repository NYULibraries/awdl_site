<?php

namespace App\Http\Controllers;

use App\Helpers\JsonHelper;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Solarium\Client;

class SearchController extends Controller
{
    public function index(Request $request, Client $solrClient): Response
    {
        $data = $this->fetchSolrData($request, $solrClient);

        return Inertia::render('Search', ['data' => $data]);

    }

    public function fetchSolrData(Request $request, Client $solrClient)
    {
        $page = (int) $request->input('page', 1);
        $rows = 12;

        $start = ($page - 1) * $rows;

        $queryText = $request->input('q', '*:*');

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
            ];
        }

        $numFound = $resultset->getNumFound();

        return [
            'start' => $start,
            'rows' => $rows,
            'docs' => $docs,
            'numFound' => $numFound,
            'queryText' => $queryText,
            'page' => $page,
            'sortField' => $sortField,
        ];
    }
}
