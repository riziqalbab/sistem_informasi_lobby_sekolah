<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class KeluarController extends Controller
{
    public function __invoke()
    {

        $guru = Guru::all();
        return Inertia::render("Keluar", [
            "guru" => $guru
        ]);
    }

    public function store(Request $request)
    {

        Log::info($request->all());
    }
}
