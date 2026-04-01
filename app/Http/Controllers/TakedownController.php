<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class TakedownController extends Controller
{
    public function index(): Response
    {
        $markdownBodyContent = File::get(resource_path('markdown/takedown.md'));

        return Inertia::render('Takedown', [
            'markdownBodyContent' => $markdownBodyContent,
        ]);
    }
}
