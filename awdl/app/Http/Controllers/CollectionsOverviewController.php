<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CollectionsOverviewController extends Controller
{
    public function index(): Response
    {

        $collectionItems = [
            ['label' => 'Ancient Judaism'],
            ['label' => 'Ancient Science'],
            ['label' => 'Assyriology'],
            ['label' => 'Central Asia'],
            ['label' => 'Classical Antiquity'],
            ['label' => 'Early Christianity'],
            ['label' => 'Egyptology'],
            ['label' => 'Hittitology'],
            ['label' => 'Iranian studies'],
            ['label' => 'Papyrology'],
        ];

        return Inertia::render('CollectionsOverview', ['collectionItems' => $collectionItems]);

    }
}
