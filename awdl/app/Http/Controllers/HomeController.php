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

        $bodyId = 'home';

        $bodyClass = 'home';

        $docs = $this->fetchSolrData($request, $solrClient);

        return Inertia::render('Home', ['bodyId' => $bodyId, 'bodyClass' => $bodyClass, 'docs' => $docs]);

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
                'zm_series_data_x' => $this->decodeJsonArray($doc->zm_series_data_x),
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

        return $docs;

    }

    private function decodeJsonArray(?array $values): array
    {
        if (! $values) {
            return [];
        }

        return array_map(function ($value) {
            $decoded = json_decode($value, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                return $this->decodeHtmlEntitiesRecursive($decoded);
            }

            return is_string($value) ? html_entity_decode($value, ENT_QUOTES | ENT_HTML5) : $value;
        }, $values);
    }

    private function decodeHtmlEntitiesRecursive($data)
    {
        if (is_string($data)) {
            return html_entity_decode($data, ENT_QUOTES | ENT_HTML5);
        }

        if (is_array($data)) {
            foreach ($data as $key => $item) {
                $data[$key] = $this->decodeHtmlEntitiesRecursive($item);
            }
        }

        return $data;
    }
}
