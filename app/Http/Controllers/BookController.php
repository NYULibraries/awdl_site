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

        $data = $response->successful() ? $response->json() : null;

        if ($data === null) {
            abort(404);
        }

        return Inertia::render('Book', [
            'title' => $data['displayTitle'] ?? null,
            'identifier' => $data['identifier'] ?? $identifier,
            'noid' => $data['noid'] ?? null,
            'url' => "{$config['endpoint']}/{$type_alias}/{$identifier}/{$sequence}",
        ]);

    }
}
