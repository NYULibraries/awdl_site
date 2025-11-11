<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {

        $markdownBodyContent = File::get(resource_path('markdown/about.md'));

        $markdownAsideContent = File::get(resource_path('markdown/aboutSidebar.md'));

        return Inertia::render('About', [
            'markdownBodyContent' => $markdownBodyContent,
            'markdownAsideContent' => $markdownAsideContent,
        ]);

    }
}
