<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class ViewerController extends Controller
{
    public function show($identifier, $sequence = 1): Response
    {

        $config = config('viewer');

        $response = Http::get("{$config['endpoint']}/api/v1/noid/{$identifier}");

        $data = $response->successful() ? $response->json() : null;

        if ($data === null) {
            abort(404);
        }

        return Inertia::render('ItemPage', [
            'title' => $data['displayTitle'] ?? null,
            'identifier' => $data['identifier'] ?? $identifier,
            'noid' => $data['noid'] ?? null,
            'url' => "{$config['endpoint']}/api/embed/{$identifier}/{$sequence}",
        ]);

    }
}
