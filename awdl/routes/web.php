<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // We are going to use this class to render React components

Route::get('/test', function () {
    return Inertia::render('test'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
});

Route::get('/', function () {
    return Inertia::render('index');
});

Route::get('/about', function () {
    return Inertia::render('about/index');
});

Route::get('/books', function () {
    return Inertia::render('books/index');
});

Route::get('/books/{bookPID}', function ($bookPID) {
    return Inertia::render('books/index', ['bookPID' => $bookPID]);
});

Route::get('/browse', function () {
    return Inertia::render('browse/index');
});

Route::get('/collectionsoverview', function () {
    return Inertia::render('collectionsoverview/index');
});

Route::get('/partners', function () {
    return Inertia::render('partners/index');
});

Route::get('/providers', function () {
    return Inertia::render('providers/index');
});

Route::get('/providers/{providerPID}', function ($providerPID) {
    return Inertia::render('providers/index', ['providerPID' => $providerPID]);
});

Route::get('/subjects', function () {
    return Inertia::render('subjects/index');
});

Route::get('/subjects/{subjectPID}', function ($subjectPID) {
    return Inertia::render('subjects/index', ['subjectPID' => $subjectPID]);
});

Route::get('/series', function () {
    return Inertia::render('series/index');
});

Route::get('/series/{seriesPID}', function ($seriesPID) {
    return Inertia::render('series/index', ['seriesPID' => $seriesPID]);
});

Route::get('/search', function () {
    return Inertia::render('search/index');
});
