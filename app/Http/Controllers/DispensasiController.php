<?php

namespace App\Http\Controllers;

use App\Models\Dispen;
use App\Models\Guru;
use App\Models\SiswaDispen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Inertia\Inertia;

class DispensasiController extends Controller
{



    public function __invoke(){
        return Inertia::render("Dispensasi/AllDispensasi");
    }


    public function dispensasi(string $id_dispen)
    {




        // interface DispensasiInfo {
        //     guruPiket: string;
        //     guruPengajar: string;
        //     nomorWhatsapp: string;
        //     waktuDispen: string;
        //     waktuDispenAkhir: string;
        //     alasan: string;
        //     deskripsi: string;
        //     siswa: {
        //         nama: string;
        //         kelas: string;
        //         avatar: string;
        //     }[];
        // }



        try {
            // Attempt to find the dispensasi record
            $dispensasi = Dispen::findOrFail($id_dispen)->toArray();

            // Fetch related records only if the dispensasi is found
            $siswa = SiswaDispen::where("id_dispen", $id_dispen)->get()->toArray();

            $guru = Guru::where("id_guru", $dispensasi["id_guru"])->firstOrFail()->toArray();
            $guru_piket = Guru::where("id_guru", $dispensasi["id_guru_piket"])->firstOrFail()->toArray();

            $nama_guru = $guru["nama"];
            $nama_guru_piket = $guru_piket["nama"];

            return Inertia::render("Dispensasi/Dispensasi", [
                "dispensasi" => [
                    "guruPiket" => $nama_guru_piket,
                    "guruPengajar" => $nama_guru,
                    "nomorWhatsapp" => $dispensasi["whatsapp"],
                    "waktuDispen" => $dispensasi["waktu_awal"],
                    "waktuDispenAkhir" => $dispensasi["waktu_akhir"],
                    "alasan" => $dispensasi["alasan"],
                    "deskripsi" => $dispensasi["deskripsi"],
                    "siswa" => $siswa,
                ]
            ]);
        } catch (ModelNotFoundException $e) {
            // Handle the case where dispensasi or related records are not found
            return Inertia::render("NotFoundDispen");
        }
    }
}
