<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // We are going to use this class to render React components

Route::get('/test', function () {
    return Inertia::render('test'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
});

Route::get('/', function () {
    return Inertia::render('HomePage');
});

Route::get('/about', function () {
    return Inertia::render('AboutPage');
});

Route::get('/books', function () {
    return Inertia::render('BookPage');
});

Route::get('/books/{bookPID}', function ($bookPID) {
    return Inertia::render('BookPage', ['bookPID' => $bookPID]);
});

Route::get('/browse', function () {
    return Inertia::render('BrowsePage');
});

Route::get('/collectionsoverview', function () {
    return Inertia::render('CollectionsPage');
});

Route::get('/partners', function () {
    return Inertia::render('PartnersPage');
});

Route::get('/providers', function () {
    return Inertia::render('ProvidersPage');
});

Route::get('/providers/{providerPID}', function ($providerPID) {
    return Inertia::render('ProvidersPage', ['providerPID' => $providerPID]);
});

Route::get('/providers/{providerPID}', function ($providerPID) {
    return Inertia::render('ProvidersPage', ['providerPID' => $providerPID]);
});

Route::get('/subjects', function () {
    return Inertia::render('SubjectsPage');
});

Route::get('/subjects/{subjectPID}', function ($subjectPID) {
    return Inertia::render('SubjectsPage', ['subjectPID' => $subjectPID]);
});

Route::get('/series', function () {
    return Inertia::render('SeriesPage');
});

Route::get('/series/{seriesPID}', function ($seriesPID) {
    return Inertia::render('SeriesPage', ['seriesPID' => $seriesPID]);
});

Route::get('/search', function () {
    return Inertia::render('SearchPage');
});
