<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class NotFoundTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_unknown_url_renders_404_page_with_404_status(): void
    {
        $this->get('/this-page-does-not-exist')
            ->assertNotFound()
            ->assertInertia(fn (Assert $page) => $page
                ->component('404')
                ->has('ziggy')
                ->has('seriesMap'));
    }

    public function test_missing_book_renders_404_page_with_404_status(): void
    {
        Http::fake(['*' => Http::response(null, 404)]);

        $this->get('/books/not-a-book')
            ->assertNotFound()
            ->assertInertia(fn (Assert $page) => $page->component('404'));
    }

    public function test_unknown_series_slug_renders_404_page(): void
    {
        $this->get('/series/not-a-series')
            ->assertNotFound()
            ->assertInertia(fn (Assert $page) => $page->component('404'));
    }
}
