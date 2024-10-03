<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasukController extends Controller
{
    public function __invoke()
    {
        $guru = Guru::all();

        return Inertia::render("Masuk", [
            "guru"=> $guru
        ]);
    }
}
