<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(string $page): Response
    {
        return Inertia::render($page, [
            'page' => $page,
        ]);
    }
}