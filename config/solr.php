<?php

return [
    'scheme' => env('SOLR_SCHEME', 'https'),
    'host' => env('SOLR_HOST', 'discovery1.dlib.nyu.edu'),
    'port' => env('SOLR_PORT', 443),
    'path' => env('SOLR_PATH', '/'),
    'core' => env('SOLR_CORE', 'viewer'),
];
