<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Solarium\Client;
use Solarium\Core\Client\Adapter\AdapterInterface;
use Solarium\Core\Client\Endpoint;
use Solarium\Core\Client\Request;
use Solarium\Core\Client\Response;
use Symfony\Component\EventDispatcher\EventDispatcher;

abstract class TestCase extends BaseTestCase
{
    protected array $sentSolrQueries = [];

    // Mocks Solr: swaps the Solarium client for one that returns $docs and records each query URL in $sentSolrQueries. Pass $status >= 400 to simulate Solr failing.
    protected function mockSolr(array $docs, array $facetFields = [], int $status = 200): void
    {
        $adapter = new class($docs, $facetFields, $status, $this->sentSolrQueries) implements AdapterInterface
        {
            public function __construct(private array $docs, private array $facetFields, private int $status, private array &$sent) {}

            public function execute(Request $request, Endpoint $endpoint): Response
            {
                $this->sent[] = urldecode($request->getUri());

                $body = json_encode([
                    'responseHeader' => ['status' => 0],
                    'response' => ['numFound' => count($this->docs), 'start' => 0, 'docs' => $this->docs],
                    'facet_counts' => ['facet_fields' => $this->facetFields],
                ]);

                return new Response($body, ["HTTP/1.1 {$this->status} Mock"]);
            }
        };

        $this->app->instance(Client::class, new Client($adapter, new EventDispatcher));
    }
}
