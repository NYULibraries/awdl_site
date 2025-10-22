<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Solarium\Client;

class SearchController extends Controller
{

    public function index(Request $request, Client $solrClient): Response
    {

        $queryText = $request->input('q');

        $page = $request->input('page', 1);

        $limit = $request->input('limit', 50);

        if ($queryText === '*:*') {
          $pageTitle = 'Browse titles';
        } elseif (!empty($queryText)) {
          $pageTitle = "Search Results for: {$queryText}";
        }

        $query = $solrClient->createSelect();

        $query->setQuery($queryText);

        $resultset = $solrClient->select($query);

        $start = 0;

        $docs = [];

        foreach ($resultset as $doc) {
          $docs[] = $doc;
        }

        return Inertia::render('Search', [
          'pageTitle' => $pageTitle,
          'query' => $query,
          'page' => $page,
          'rows' => $limit,
          'limit' => $limit,
          'start' => $start,
          'documents' => $docs,
        ]);

    }
}

