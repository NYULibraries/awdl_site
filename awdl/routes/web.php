<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // We are going to use this class to render React components

Route::get('/', function () {
    return Inertia::render('test'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
});

Route::get('/book', function () {
    return Inertia::render('BookPage');
});

Route::get('/test', function () {
    return Inertia::render('Test');
});
