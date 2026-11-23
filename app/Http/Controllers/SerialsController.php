<?php

namespace App\Http\Controllers;

use App\Helpers\JsonHelper;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Solarium\Client;
use Solarium\Exception\HttpException;
use Solarium\QueryType\Select\Query\Query;
use Solarium\QueryType\Select\Result\Result;

class SerialsController extends Controller
{
    public function index(Client $solrClient): Response
    {
        $query = $this->serialsQuery($solrClient, 'bsa');
        $query->setFields(['sm_collection_code', 'sm_collection_label']);
        $query->setRows(1000);

        $resultset = $this->select($solrClient, $query);

        $docs = collect($resultset->getDocuments())
            ->map(fn ($doc) => $doc->getFields())
            ->groupBy(fn ($doc) => $doc['sm_collection_code'][0])
            ->map(fn ($volumes, $code) => [
                'id' => $code,
                'label' => $volumes->first()['sm_collection_label'][0] ?? $code,
                'path' => "serials/{$code}?page=1",
                'count' => $volumes->count(),
            ])
            ->sortBy('label')
            ->values()
            ->all();

        return Inertia::render('SerialsIndex', ['docs' => $docs]);
    }

    public function show(string $id, Request $request, Client $solrClient): Response
    {
        $page = max(1, (int) $request->input('page', 1));
        $rows = 12;
        $start = ($page - 1) * $rows;
        $sortField = $this->sortField($request);

        $query = $this->serialsQuery($solrClient, $id);
        $query->setFields(['*']);
        $query->setStart($start);
        $query->setRows($rows);
        $query->addSort($sortField, $query::SORT_ASC);

        $resultset = $this->select($solrClient, $query);

        if ($resultset->getNumFound() === 0) {
            abort(404, 'Serial not found');
        }

        $documents = [];

        foreach ($resultset as $doc) {
            $documents[] = [
                'identifier' => $doc->ss_identifier,
                'bundle' => $doc->bundle,
                'title' => $doc->ss_title_long ?? 'N.A.',
                'authors' => $doc->sm_author ?? [],
                'seriesData' => [],
                'publisher' => JsonHelper::decodeHtmlEntitiesRecursive($doc->sm_publisher[0] ?? 'N.A.'),
                'publicationPlace' => $doc->sm_field_publication_location ?? [],
                'publicationDate' => $doc->ss_publication_date_text ?? 'N.A.',
                'providerIds' => $doc->sm_provider_nid ?? [],
                'providerLabels' => $doc->sm_provider_label ?? [],
                'subjectIds' => $doc->im_field_subject ?? [],
                'subjectLabels' => $doc->sm_subject_label ?? [],
                'bs_status' => $doc->bs_status,
                'id' => $doc->sm_collection_code[0] ?? $id,
                'label' => $doc->sm_collection_label[0] ?? '',
                'series' => [],
                'path' => "viewer/{$doc->ss_identifier}?page=1",
                'volume' => $doc->ss_volume ?? null,
            ];
        }

        $serialLabel = $documents[0]['label'];

        return Inertia::render('SerialsPID', [
            'data' => [
                'pageTitle' => $serialLabel,
                'pageId' => 'serials',
                'docs' => $documents,
                'start' => $start,
                'rows' => $rows,
                'numFound' => $resultset->getNumFound(),
                'serialLabel' => $serialLabel,
                'sortField' => $sortField,
                'page' => $page,
            ],
        ]);
    }

    private function select(Client $solrClient, Query $query): Result
    {
        try {
            return $solrClient->select($query);
        } catch (HttpException $e) {
            report($e);
            abort(502, 'Solr unavailable');
        }
    }

    private function serialsQuery(Client $solrClient, string $collectionCode): Query
    {
        $query = $solrClient->createSelect();

        $query->setQuery('*:*');

        $query->addFilterQuery([
            'key' => 'bundle_filter',
            'query' => 'bundle:dlts_serial',
        ]);

        $query->addFilterQuery([
            'key' => 'collection_code_filter',
            'query' => "sm_collection_code:{$collectionCode}",
        ]);

        $query->addFilterQuery([
            'key' => 'status',
            'query' => 'bs_status:1',
        ]);

        return $query;
    }
}
