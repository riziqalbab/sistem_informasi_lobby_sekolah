<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\Masuk;
use App\Models\SiswaMasuk;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class TerlambatController extends Controller
{


    public function __invoke(Request $request){
    
        $date = $request->get("date") != null ? $request->get("date") : Carbon::now()->toDateString();
        $siswa_terlambat = SiswaMasuk::all();

        $terlambat = DB::table("siswa_dispen")->whereDate("tanggal", $date)->paginate(10);
        return Inertia::render("Masuk/AllMasuk", [
            "terlambat"=>$terlambat,
            "date"=> $date
        ]);
    }
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
