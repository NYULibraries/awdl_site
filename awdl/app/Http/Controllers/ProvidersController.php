<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProvidersController extends Controller
{
    public function index(): Response
    {

        // body has no id or class on index page

        $providersMap = json_decode(file_get_contents(resource_path('datasource/providersMap.json')));

        return Inertia::render('Providers', ['providersMap' => $providersMap]);
    }
}
