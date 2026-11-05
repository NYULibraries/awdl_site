<?php

namespace App\Http\Controllers;

use App\Helpers\JsonHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class SerialsController extends Controller
{
    public function index(): Response
    {
        $resultset = $this->fetchSerials(
            'fq=bundle:dlts_serial&fq=sm_collection_code:bsa&fq=bs_status:1&fl=sm_collection_code,sm_collection_label&rows=1000'
        );

        $docs = collect($resultset['docs'])
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

    public function show(string $id, Request $request): Response
    {
        $page = max(1, (int) $request->input('page', 1));
        $rows = 12;
        $start = ($page - 1) * $rows;
        $sortField = $this->sortField($request);

        $resultset = $this->fetchSerials(
            "fq=bundle:dlts_serial&fq=sm_collection_code:{$id}&fq=bs_status:1&start={$start}&rows={$rows}&sort={$sortField}+asc"
        );

        if (empty($resultset['docs'])) {
            abort(404, 'Serial not found');
        }

        $documents = [];

        foreach ($resultset['docs'] as $doc) {
            $documents[] = [
                'identifier' => $doc['ss_identifier'],
                'title' => $doc['ss_title_long'] ?? 'N.A.',
                'authors' => $doc['sm_author'] ?? [],
                'seriesData' => [],
                'publisher' => JsonHelper::decodeHtmlEntitiesRecursive($doc['sm_publisher'][0] ?? 'N.A.'),
                'publicationPlace' => $doc['sm_field_publication_location'] ?? [],
                'publicationDate' => $doc['ss_publication_date_text'] ?? 'N.A.',
                'providerIds' => $doc['sm_provider_nid'] ?? [],
                'providerLabels' => $doc['sm_provider_label'] ?? [],
                'subjectIds' => $doc['im_field_subject'] ?? [],
                'subjectLabels' => $doc['sm_subject_label'] ?? [],
                'bs_status' => $doc['bs_status'],
                'id' => $doc['sm_collection_code'][0] ?? $id,
                'label' => $doc['sm_collection_label'][0] ?? '',
                'series' => [],
                'path' => "books/{$doc['ss_identifier']}?page=1",
                'volume' => $doc['ss_volume'] ?? null,
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
                'numFound' => $resultset['numFound'],
                'serialLabel' => $serialLabel,
                'sortField' => $sortField,
                'page' => $page,
            ],
        ]);
    }

    private function fetchSerials(string $query): array
    {
        $config = config('viewer');

        $response = Http::get(rtrim($config['endpoint'], '/')."/api/v1/search?{$query}");

        if (! $response->successful() || ! is_array($response->json())) {
            abort(502, 'Viewer search unavailable');
        }

        return [
            'docs' => $response->json('docs') ?? [],
            'numFound' => $response->json('numFound') ?? 0,
        ];
    }
}
