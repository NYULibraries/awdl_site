<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class BrowseTest extends TestCase
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
            'sm_provider_nid' => ['726'],
            'sm_provider_label' => ['Institute for the Study of the Ancient World'],
            'bs_status' => true,
        ];
    }

    // Browse shows serial volumes with their identifier and bundle.
    public function test_browse_lists_serial_volumes(): void
    {
        $this->mockSolr([$this->serialVolume()]);

        $this->get('/browse')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Browse')
                ->where('data.docs.0.identifier', 'isaw_bsa000001')
                ->where('data.docs.0.bundle', 'dlts_serial'));
    }

    // Every Solr query from browse includes books and serials and the bsa collection.
    public function test_browse_queries_include_serials(): void
    {
        $this->mockSolr([$this->serialVolume()]);

        $this->get('/browse');

        $this->assertNotEmpty($this->sentSolrQueries);
        foreach ($this->sentSolrQueries as $query) {
            $this->assertStringContainsString('bundle:(dlts_book OR dlts_serial)', $query);
            $this->assertStringContainsString('sm_collection_code:(awdl OR egypt OR bsa)', $query);
        }
    }
}
