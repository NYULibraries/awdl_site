<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Solarium\Client;

class ProvidersController extends Controller
{
    public function index(): Response
    {

        // body has no id or class on index page

        $providersMap = json_decode(file_get_contents(resource_path('datasource/providersMap.json')));

        return Inertia::render('ProviderIndex', ['providersMap' => $providersMap]);
    }
    public function show($id, Request $request, Client $solrClient): Response
    {
        $bodyId = 'providers-'.$id;

        $data = $this->fetchSolrDataByPID($request, $solrClient, $id);

        $providersMap = json_decode(file_get_contents(resource_path('datasource/providersMap.json')));
        
        $idAlias = null;

        if (isset($providersMap->$id)) {
            $idAlias = $providersMap->$id;
        } else {
            $idAlias = $id;
        }


        return Inertia::render('ProviderPID', ['bodyId' => $bodyId, 'data' => $data, 'idAlias' => $idAlias]);

    }

    public function fetchSolrDataByPID(Request $request, Client $solrClient, $providerPID)
    {
        $page = (int) $request->input('page', 1);
        $rows = 12;
        $start = ($page - 1) * $rows;

        $providerPID = (int) $providerPID;
        $queryText = "sm_provider_nid:($providerPID)";

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
        ];
    }
}
