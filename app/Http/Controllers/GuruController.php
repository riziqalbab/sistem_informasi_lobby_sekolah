<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class GuruController extends Controller
{
    public function __invoke()
    {

        $guru = Guru::all();

        return Inertia::render("Guru", [
            "guru" => $guru
        ]);
    }

    public function store(Request $request)
    {

        // Log::info($request->all());

        $validator = Validator::make($request->all(), [
            "nama" => "required",
            "mapel" => "required",
            "whatsapp" => "required|unique:guru,whatsapp",
        ], [
            "nama" => "Nama harus diisi",
            "mapel" => "Mata pelajaran harus diisi",
            "whatsapp" => [
                "required" => "Nomor Whatsapp harus dii",
                "unique" => "Nomor Whatsapp sudah digunakan"
            ]
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        Guru::create($request->all());
        return redirect()->back()->with("success", true);
    }
}
