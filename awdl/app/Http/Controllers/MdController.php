<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MdController extends Controller
{
    public function show(Post $post): Response
    {   
    $markdownContent = $post->content;

    return Inertia::render('Post', [
        'bodyId' => 'page',
        'markdownContent' => $markdownContent,
    ]);
}
}