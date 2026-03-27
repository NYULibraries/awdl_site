<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BrowseController;
use App\Http\Controllers\CollectionsOverviewController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PartnersController;
use App\Http\Controllers\ProvidersController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SeriesController;
use App\Http\Controllers\SubjectsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::get('collectionsoverview', [CollectionsOverviewController::class, 'index'])
    ->name('collectionsoverview');

Route::get('search', [SearchController::class, 'index'])
    ->name('search');

Route::get('about', [AboutController::class, 'index'])
    ->name('about');

Route::get('books/{id}', [BookController::class, 'show'])
    ->name('books.show');

Route::get('books/{id}/{sequence}', [BookController::class, 'show'])
    ->name('books.sequence');

Route::get('browse', [BrowseController::class, 'index'])
    ->name('browse');

Route::get('partners', [PartnersController::class, 'index'])
    ->name('partners');

Route::get('providers', [ProvidersController::class, 'index'])
    ->name('providers');

Route::get('providers/{id}', [ProvidersController::class, 'show'])
    ->name('providers.show');

Route::get('subjects', [SubjectsController::class, 'index'])
    ->name('subjects');

Route::get('subjects/{id}', [SubjectsController::class, 'show'])
    ->name('subjects.show');

Route::get('series', [SeriesController::class, 'index'])
    ->name('series');

Route::get('series/{id}', [SeriesController::class, 'show'])
    ->name('series.show');

 Route::fallback(function () {
    return Inertia::render('404');
});