<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProvidersTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    private function serialVolume(): array
    {
        return [
            'ss_identifier' => 'isaw_bsa000001',
            'bundle' => 'dlts_serial',
            'ss_title_long' => 'Bulletin on Sumerian agriculture, vol. 1',
            'sm_author' => ['Sumerian Agriculture Group'],
            'sm_publisher' => ['Cambridge'],
            'sm_field_publication_location' => ['Cambridge, U.K'],
            'ss_publication_date_text' => '1984',
            'sm_provider_nid' => ['726'],
            'sm_provider_label' => ['Institute for the Study of the Ancient World'],
            'im_field_subject' => [12402],
            'sm_subject_label' => ['Sumerians -- Periodicals'],
            'bs_status' => true,
        ];
    }

    // A provider id with no matching docs shows the 404 page instead of crashing.
    public function test_unknown_provider_renders_404_page(): void
    {
        $this->mockSolr([]);

        $this->get('/providers/999999')
            ->assertNotFound()
            ->assertInertia(fn (Assert $page) => $page->component('404'));
    }

    // A provider page lists serial volumes and takes its title from the provider label.
    public function test_provider_page_lists_serial_volumes(): void
    {
        $this->mockSolr([$this->serialVolume()]);

        $this->get('/providers/726')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('ProviderPID')
                ->where('idAlias', 'Institute for the Study of the Ancient World')
                ->where('data.docs.0.identifier', 'isaw_bsa000001')
                ->where('data.docs.0.bundle', 'dlts_serial'));
    }

    // Every Solr query from a provider page includes books and serials and the bsa collection.
    public function test_provider_queries_include_serials(): void
    {
        $this->mockSolr([$this->serialVolume()]);

        $this->get('/providers/726');

        $this->assertNotEmpty($this->sentSolrQueries);
        foreach ($this->sentSolrQueries as $query) {
            $this->assertStringContainsString('bundle:(dlts_book OR dlts_serial)', $query);
            $this->assertStringContainsString('sm_collection_code:(awdl OR egypt OR bsa)', $query);
        }
    }

    // Every Solr query from the providers index includes books and serials and the bsa collection.
    public function test_provider_index_queries_include_serials(): void
    {
        $this->mockSolr([$this->serialVolume()], ['provider_nids' => []]);

        $this->get('/providers')->assertOk();

        $this->assertNotEmpty($this->sentSolrQueries);
        foreach ($this->sentSolrQueries as $query) {
            $this->assertStringContainsString('bundle:(dlts_book OR dlts_serial)', $query);
            $this->assertStringContainsString('sm_collection_code:(awdl OR egypt OR bsa)', $query);
        }
    }
}
