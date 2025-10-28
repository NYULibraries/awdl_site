<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class PartnersController extends Controller
{
    public function index(): Response
    {

      $id = 'partners';

      $title = 'Partners';

      $markdownBodyContent = File::get(resource_path('markdown/partners.md'));

      return Inertia::render('Partners', [
        'id' => $id,
        'title' => $title,
        'markdownBodyContent' => $markdownBodyContent,
      ]);

    }

}
