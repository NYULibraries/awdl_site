<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Solarium\Client;

class SeriesController extends Controller
{
    public function index(Request $request, Client $solrClient): Response
    {

        $docs = $this->fetchSeriesData($request, $solrClient);

        return Inertia::render('Series', ['docs' => $docs]);

    }

    public function show($id, Request $request, Client $solrClient): Response
    {

        //   sort=iass_longlabel asc

        $pageTitle = '';

        $documents = [];

        $seriesMap = json_decode(file_get_contents(resource_path('datasource/series.json')));

        if (isset($seriesMap->$id)) {

            $seriesIdentifier = $seriesMap->$id;

            $queryText = '*:*';

            $start = 0;

            $rows = 12;

            $sortField = 'ss_series_label';

            $fields = [
                '*',
            ];

            $query = $solrClient->createSelect();

            $query->setQuery($queryText);

            $query->addFilterQuery([
                'key' => 'bundle_filter',
                'query' => 'bundle:dlts_book',
            ]);

            $query->addFilterQuery([
                'key' => 'series_identifier',
                'query' => "sm_series_identifier:{$seriesIdentifier}",
            ]);

            $query->addFilterQuery([
                'key' => 'ispartofserie',
                'query' => 'is_ispartofseries:1',
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

            foreach ($resultset as $doc) {

                $pathAlias = (string) $doc->path_alias;

                $pathAlias = str_replace('content/', 'series/', $pathAlias).'?page=1';

                $series = [];

                foreach ($doc->zm_series_data_x as $data) {
                    $datax = json_decode($data);
                    foreach ($datax as $xx) {
                        $series[$xx->series_identifier] = [
                            'label' => $xx->series_label,
                            'identifier' => $xx->series_identifier,
                        ];
                    }
                }

                $documents[] = [
                    'id' => $doc->ss_series_identifier,
                    'identifier' => $doc->ss_book_identifier,
                    'title' => $doc->ss_title_long,
                    'authors' => $doc->sm_author,
                    'label' => $doc->ss_series_label,
                    'series' => $series,
                    'publisher' => $doc->sm_publisher,
                    'publocation' => $doc->sm_field_publication_location,
                    'date' => $doc->ss_publication_date_text,
                    'providers' => $doc->sm_provider_nid, // zm_provider
                    'path' => $pathAlias,
                ];

            }

        }

        if (! empty($documents[0])) {
            $pageTitle = $documents[0]['series'][$seriesIdentifier]['label'];
        }

        return Inertia::render('SeriesItems', [
            'pageTitle' => $pageTitle,
            'pageId' => 'series',
            'documents' => $documents,
        ]);

    }

    public function fetchSeriesData(Request $request, Client $solrClient)
    {

        $queryText = '*:*';

        $start = 0;

        $rows = 150;

        $sortField = 'ss_series_label';

        $collectionCode = 'awdl OR egypt';

        $fields = [
            'ss_series_label',
            'path_alias',
            'ss_series_identifier',
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
            $pathAlias = (string) $doc->path_alias;
            $pathAlias = str_replace('content/', 'series/', $pathAlias).'?page=1';
            $docs[] = [
                'id' => $doc->ss_series_identifier,
                'label' => $doc->ss_series_label,
                'path' => $pathAlias,
            ];
        }

        return $docs;

    }
}
