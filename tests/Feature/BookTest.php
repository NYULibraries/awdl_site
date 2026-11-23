<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class BookTest extends TestCase
{
    // With the embed flag off, a book loads the old /books viewer URL.
    public function test_book_uses_legacy_books_viewer(): void
    {
        $this->withoutVite();
        config(['viewer.books_use_embed' => false]);
        Http::fake(['*/api/v1/books/nyu_aco000001' => Http::response(['identifier' => 'nyu_aco000001'])]);

        $this->get('/books/nyu_aco000001/3')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('ItemPage')
                ->where('url', 'https://sites.dlib.nyu.edu/viewer/books/nyu_aco000001/3'));
    }

    // With VIEWER_BOOKS_USE_EMBED on, /books 301-redirects to the embed viewer at /viewer.
    public function test_book_redirects_to_embed_viewer_when_enabled(): void
    {
        config(['viewer.books_use_embed' => true]);

        $this->get('/books/nyu_aco000001/3')
            ->assertStatus(301)
            ->assertRedirect('/viewer/nyu_aco000001/3');
    }
}
