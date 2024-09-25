<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Client\ResponseSequence;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;


class SiswaController extends Controller
{
    public function __invoke()
    {

        return Inertia::render("Siswa", []);
    }


    public function getOne($nis)
    {
        $siswa = Siswa::where("nis", $nis)->first();

        if (is_null($siswa)) {
            return response()->json(["message" => "Tidak ditemukan"], Response::HTTP_NOT_FOUND);
        }

        return response()->json(["data" => $siswa], Response::HTTP_OK);
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
