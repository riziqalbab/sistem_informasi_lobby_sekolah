<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function __invoke()
    {

        return Inertia::render("Siswa", []);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "nis" => ["required", "unique:siswa,nis"],
            "nama" => ["required"],
            "kelas" => ["required"],
        ], [
            "nis.required" => "Wajib mengisi nis",
            "nis.unique" => "Nis sudah ada",
            "nama" => "Nama wajib diisi",
            "kelas" => "Kelas wajib diisi",
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        Siswa::create($request->all());

        return redirect()->back()->with("success", true);
    }
}
