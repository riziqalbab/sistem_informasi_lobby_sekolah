<?php

namespace App\Http\Controllers;

use App\Models\Dispen;
use App\Models\Guru;
use App\Models\SiswaDispen;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DispensasiController extends Controller
{

    public function __invoke(Request $request)
    {

        $site_url = url("/");
        $date = $request->get("date") != null ? $request->get("date") : Carbon::now()->toDateString();
        return Inertia::render("Dispensasi/IndexDispensasi", [
            "dispen" => SiswaDispen::with("kelas")->with("dispen")->whereDate("tanggal", $date)->get()->toArray(),
            "site_url" => $site_url,
            "date" => $date
        ]);
    }

    public function dispensasi(string $id_dispen)
    {

        try {
            $dispensasi = Dispen::findOrFail($id_dispen)->toArray();

            $siswa = SiswaDispen::where("id_dispen", $id_dispen)->get()->toArray();

            $guru = Guru::where("id_guru", $dispensasi["id_guru"])->firstOrFail()->toArray();
            $guru_piket = Guru::where("id_guru", $dispensasi["id_guru_piket"])->firstOrFail()->toArray();

            $nama_guru = $guru["nama"];
            $nama_guru_piket = $guru_piket["nama"];

            return Inertia::render("Dispensasi/Dispensasi", [
                "dispensasi" => [
                    "id_dispen" => $id_dispen,
                    "guruPiket" => $nama_guru_piket,
                    "guruPengajar" => $nama_guru,
                    "nomorWhatsapp" => $dispensasi["whatsapp"],
                    "waktuDispen" => $dispensasi["waktu_awal"],
                    "waktuDispenAkhir" => $dispensasi["waktu_akhir"],
                    "alasan" => $dispensasi["alasan"],
                    "deskripsi" => $dispensasi["deskripsi"],
                    "siswa" => $siswa,
                    "status" => $dispensasi["status"]
                ]
            ]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render("NotFoundDispen");
        }
    }

    public function confirm(Request $request)
    {
        $id_dispen = $request->post("id_dispen");
        $status = $request->post("status");


        try {

            $dispen = Dispen::findOrFail($id_dispen)->toArray();
            
            if($status){
                Dispen::where("id_dispen", $id_dispen)->update([
                    "status"=> "accepted"
                ]);
            } else{
                $alasan = $request->post("alasan");
                Dispen::where("id_dispen", $id_dispen)->update([
                    "status"=> "rejected"
                ]);
            }

        } catch (ModelNotFoundException $e) {
            return Inertia::render("NotFoundDispen");
        }


    }
}
