<?php

return [
    'endpoint' => rtrim(env('VIEWER_ENDPOINT', 'https://sites.dlib.nyu.edu/viewer'), '/'),
    // TODO: set true once books move to the embed viewer, then route books straight to ViewerController
    'books_use_embed' => (bool) env('VIEWER_BOOKS_USE_EMBED', false),
];
