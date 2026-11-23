<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class Controller
{
  // Helper to default sortfield to title if sortfield entered is not valid
    protected function sortField(Request $request): string
    {
        $sortField = $request->input('sortfield');

        return in_array($sortField, ['ss_longlabel', 'ss_sauthor'], true) ? $sortField : 'ss_longlabel';
    }
}
