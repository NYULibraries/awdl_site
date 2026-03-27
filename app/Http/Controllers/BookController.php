<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    public function show($identifier, $sequence = 1): Response
    {

        $config = config('viewer');

        $type_alias = 'books';

        $response = Http::get("{$config['endpoint']}/api/v1/{$type_alias}/{$identifier}");

        // Check for success and retrieve JSON data
        if ($response->successful()) {
            $data = $response->json();

            return Inertia::render('Book', [
                'title' => $data['displayTitle'],
                'identifier' => $data['identifier'],
                'noid' => $data['noid'],
                'url' => "{$config['endpoint']}/{$type_alias}/{$identifier}/{$sequence}",
            ]);
        } else {
            return Inertia::render('BookError', []);
        }

    }
}
