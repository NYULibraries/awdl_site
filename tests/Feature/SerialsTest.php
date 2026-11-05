<?php

namespace Tests\Feature;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
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

    private function fakeViewer(array $docs): void
    {
        Http::fake([
            '*/api/v1/search*' => Http::response(['numFound' => count($docs), 'docs' => $docs]),
        ]);
    }

    public function test_index_lists_each_serial_once(): void
    {
        $this->fakeViewer([$this->volume(1), $this->volume(2)]);

        $this->get('/serials')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('SerialsIndex')
                ->has('docs', 1)
                ->where('docs.0.id', 'bsa')
                ->where('docs.0.label', 'Bulletin on Sumerian Agriculture')
                ->where('docs.0.count', 2));

        Http::assertSent(fn (Request $request) => str_contains($request->url(), 'fq=bundle:dlts_serial')
            && str_contains($request->url(), 'fq=sm_collection_code:bsa'));
    }

    public function test_show_maps_volumes_to_book_items(): void
    {
        $this->fakeViewer([$this->volume(1)]);

        $this->get('/serials/bsa')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('SerialsPID')
                ->where('data.serialLabel', 'Bulletin on Sumerian Agriculture')
                ->where('data.numFound', 1)
                ->where('data.docs.0.identifier', 'isaw_bsa000001')
                ->where('data.docs.0.seriesData', [])
                ->where('data.docs.0.path', 'books/isaw_bsa000001?page=1'));
    }

    public function test_show_passes_valid_sortfield_to_viewer(): void
    {
        $this->fakeViewer([$this->volume(1)]);

        $this->get('/serials/bsa?sortfield=ss_sauthor')
            ->assertInertia(fn (Assert $page) => $page->where('data.sortField', 'ss_sauthor'));

        Http::assertSent(fn (Request $request) => str_contains($request->url(), 'sort=ss_sauthor+asc'));
    }

    public function test_show_falls_back_to_title_for_invalid_sortfield(): void
    {
        $this->fakeViewer([$this->volume(1)]);

        $this->get('/serials/bsa?sortfield='.urlencode('ss_longlabel&rows=100000'))
            ->assertInertia(fn (Assert $page) => $page->where('data.sortField', 'ss_longlabel'));

        Http::assertNotSent(fn (Request $request) => str_contains($request->url(), 'rows=100000'));
    }

    public function test_unknown_serial_renders_404_page(): void
    {
        $this->fakeViewer([]);

        $this->get('/serials/nope')
            ->assertNotFound()
            ->assertInertia(fn (Assert $page) => $page->component('404'));
    }

    public function test_serial_id_with_solr_syntax_never_reaches_viewer(): void
    {
        Http::fake();

        $this->get('/serials/'.rawurlencode('bsa OR x'))->assertNotFound();

        Http::assertNotSent(fn (Request $request) => str_contains($request->url(), '/api/v1/search'));
    }

    public function test_viewer_failure_returns_502(): void
    {
        Http::fake(['*' => Http::response('down', 500)]);

        $this->get('/serials')->assertStatus(502);
    }
}
