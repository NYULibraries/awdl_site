<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Solarium\Client;

class HomeController extends Controller
{
    public function index(Request $request, Client $solrClient): Response
    {
        $docs = $this->fetchSolrData($request, $solrClient);

        return Inertia::render('Home', ['docs' => $docs]);

    }

    public function fetchSolrData(Request $request, Client $solrClient)
    {
        $start = 0;

        $rows = 12;

        $queryText = '*:*';

        $sortField = 'ss_longlabel';

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
            'query' => 'bundle:dlts_series',
        ]);

        $query->addFilterQuery([
            'key' => 'collection_code_filter',
            'query' => 'sm_series_code:('.$collectionCode.')',
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
            // $pathAlias = (string) $doc->path_alias;
            // $pathAlias = str_replace('content/', 'series/', $pathAlias).'?page=1';
            $docs[] = [
                'id' => $doc->ss_series_identifier,
                'title' => $doc->ss_title_long,
                'authors' => $doc->sm_author,
                'series' => $doc->zm_series_data_x,
                'publisher' => $doc->sm_publisher,
                'publication_location' => $doc->sm_field_publication_location,
                'publication_date' => $doc->ss_publication_date_text,
                'provider_codes' => $doc->sm_provider_nid,
                'provider_labels' => $doc->sm_provider_label,
                'subject_codes' => $doc->im_field_subject,
                'subject_labels' => $doc->sm_subject_label,
                // 'path' => $pathAlias,
            ];
        }

        return $docs;

    }
}
