<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Solarium\Client;
use Solarium\Core\Client\Adapter\Curl;
use Symfony\Component\EventDispatcher\EventDispatcher;

class SolrServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(Client::class, function ($app) {

            $config = config('solr');

            return new Client(
                new Curl,
                new EventDispatcher,
                [
                    'endpoint' => [
                        'default' => [
                            'host' => $config['host'],
                            'port' => $config['port'],
                            'path' => $config['path'],
                            'core' => $config['core'],
                        ],
                    ],
                ]
            );
        });
    }

    public function boot()
    {
        //
    }
}
