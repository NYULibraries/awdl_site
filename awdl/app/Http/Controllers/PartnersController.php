<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class PartnersController extends Controller
{
    public function index(): Response
    {

        $title = 'Partners';

        $markdownBodyContent = File::get(resource_path('markdown/partners.md'));

        return Inertia::render('Partners', [
            'title' => $title,
            'markdownBodyContent' => $markdownBodyContent,
        ]);

    }
}
