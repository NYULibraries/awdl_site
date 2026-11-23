<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SerialsTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    private function volume(int $number): array
    {
        return [
            'ss_identifier' => sprintf('isaw_bsa%06d', $number),
            'ss_title_long' => "Bulletin on Sumerian agriculture, vol. {$number}",
            'sm_author' => ['Sumerian Agriculture Group'],
            'sm_publisher' => ['Cambridge'],
            'sm_field_publication_location' => ['Cambridge, U.K'],
            'ss_publication_date_text' => '1984',
            'sm_provider_nid' => ['726'],
            'sm_provider_label' => ['Institute for the Study of the Ancient World'],
            'im_field_subject' => [12402],
            'sm_subject_label' => ['Sumerians -- Periodicals'],
            'bs_status' => true,
            'sm_collection_code' => ['bsa'],
            'sm_collection_label' => ['Bulletin on Sumerian Agriculture'],
            'ss_volume' => (string) $number,
        ];
    }

    // The serials index groups volumes into one entry per serial, with a volume count, and filters Solr to bsa serials.
    public function test_index_lists_each_serial_once(): void
    {
        $this->mockSolr([$this->volume(1), $this->volume(2)]);

        $this->get('/serials')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('SerialsIndex')
                ->has('docs', 1)
                ->where('docs.0.id', 'bsa')
                ->where('docs.0.label', 'Bulletin on Sumerian Agriculture')
                ->where('docs.0.count', 2));

        $this->assertStringContainsString('fq=bundle:dlts_serial', $this->sentSolrQueries[0]);
        $this->assertStringContainsString('fq=sm_collection_code:bsa', $this->sentSolrQueries[0]);
    }

    // A serial page maps each Solr volume to a book item that links to the embed viewer.
    public function test_show_maps_volumes_to_book_items(): void
    {
        $this->mockSolr([$this->volume(1)]);

        $this->get('/serials/bsa')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('SerialsPID')
                ->where('data.serialLabel', 'Bulletin on Sumerian Agriculture')
                ->where('data.numFound', 1)
                ->where('data.docs.0.identifier', 'isaw_bsa000001')
                ->where('data.docs.0.seriesData', [])
                ->where('data.docs.0.path', 'viewer/isaw_bsa000001?page=1'));
    }

    // An allowed sortfield is passed to Solr as an ascending sort.
    public function test_show_passes_valid_sortfield_to_solr(): void
    {
        $this->mockSolr([$this->volume(1)]);

        $this->get('/serials/bsa?sortfield=ss_sauthor')
            ->assertInertia(fn (Assert $page) => $page->where('data.sortField', 'ss_sauthor'));

        $this->assertStringContainsString('sort=ss_sauthor asc', $this->sentSolrQueries[0]);
    }

    // An unknown or injected sortfield falls back to title and never reaches Solr.
    public function test_show_falls_back_to_title_for_invalid_sortfield(): void
    {
        $this->mockSolr([$this->volume(1)]);

        $this->get('/serials/bsa?sortfield='.urlencode('ss_longlabel&rows=100000'))
            ->assertInertia(fn (Assert $page) => $page->where('data.sortField', 'ss_longlabel'));

        $this->assertStringNotContainsString('rows=100000', $this->sentSolrQueries[0]);
    }

    // A serial with no volumes shows the 404 page.
    public function test_unknown_serial_renders_404_page(): void
    {
        $this->mockSolr([]);

        $this->get('/serials/nope')
            ->assertNotFound()
            ->assertInertia(fn (Assert $page) => $page->component('404'));
    }

    // A serial id containing Solr syntax is rejected by the route before any Solr query runs.
    public function test_serial_id_with_solr_syntax_never_reaches_solr(): void
    {
        $this->mockSolr([]);

        $this->get('/serials/'.rawurlencode('bsa OR x'))->assertNotFound();

        $this->assertEmpty($this->sentSolrQueries);
    }

    // A Solr error returns 502 instead of a 500 crash.
    public function test_solr_failure_returns_502(): void
    {
        $this->mockSolr([], [], 500);

        $this->get('/serials')->assertStatus(502);
    }
}
