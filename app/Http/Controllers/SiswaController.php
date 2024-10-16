<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;


class SiswaController extends Controller
{
    public function __invoke()
    {

        $kelas = Kelas::all();
        return Inertia::render("Siswa", [
            "kelas"=> $kelas
        ]);
    }


    public function getOne($nis)
    {
        $siswa = Siswa::with("kelas")->find($nis);

        if (is_null($siswa)) {
            return response()->json(["message" => "Tidak ditemukan"], 404);
        }


        return response()->json(["data" => $siswa], 200);
    }


    public function store(Request $request)
    {

        Log::info($request->all());


        $validator = Validator::make($request->all(), [
            "nis" => ["required", "unique:siswa,nis"],
            "nama" => ["required"],
            "id_kelas" => ["required"],
        ], [
            "nis.required" => "Wajib mengisi nis",
            "nis.unique" => "Nis sudah ada",
            "nama" => "Nama wajib diisi",
            "id_kelas" => "Kelas wajib diisi",
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        Siswa::insert($request->all());

        return redirect()->back()->with("success", true);
    }
}
