<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\Masuk;
use App\Models\SiswaMasuk;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class Terlambat extends Controller
{
    public function detail(string $id_masuk)
    {

        try {
            $dispensasi = Masuk::findOrFail($id_masuk)->toArray();
            
            $piket = GuruPiket::find($dispensasi["id_guru_piket"])->with('guru')->get()->first();
            $guru = Guru::where("id_guru", $dispensasi["id_guru"])->firstOrFail()->toArray();
            
            $nama_guru = $guru["nama"];

            $siswa = SiswaMasuk::where("id_masuk", $id_masuk)->get()->toArray();

            Log::info($guru);


            return Inertia::render("TerlambatDetail", [
                "guru_piket"=> $piket,
                "guru"=> $guru,
                "siswa" => $siswa,
                
            ]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render("NotFoundDispen");
        }


    }
}
