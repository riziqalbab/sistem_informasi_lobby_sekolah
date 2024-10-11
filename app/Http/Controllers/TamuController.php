<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\Tamu;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TamuController extends Controller
{


    public function tambah()
    {
        $guru = Guru::all();
        $date_now = Carbon::now()->toDateString();
        $site_url = url("/");

        $piket = GuruPiket::where('tanggal', $date_now)
            ->with('guru')
            ->get()->first();


        return Inertia::render("Tamu/CreateTamu", [
            "guru" => $guru,
            "guru_piket" => $piket,
            "site_url"=> $site_url
        ]);
    }


    public function tamu(Request $request)
    {


        $date = $request->get("date") != null ? $request->get("date") : Carbon::now()->toDateString();
        $tamu = DB::table("tamus")->whereDate("created_at", $date)->paginate(10);
        return Inertia::render("Tamu/IndexTamu", [
            "date" => $date,
            "tamu" => $tamu
        ]);
    }


    public function detail($id_tamu)
    {
        try {
            $tamu = Tamu::findOrFail($id_tamu);
            return Inertia::render("Tamu/DetailTamu", [
                "tamu"=> $tamu
            ]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render("NotFoundDispen");
        }
    }
    public function guestDetail($id_tamu)
    {
        try {
            $tamu = Tamu::findOrFail($id_tamu);
            return Inertia::render("Tamu/GuestDetail", [
                "tamu"=> $tamu
            ]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render("NotFoundDispen");
        }
    }


    public function store(Request $request)
    {

        Log::info($request->all());


        $validator = Validator::make($request->all(), [
            "nama" => "required",
            "id_guru_piket" => "required",
            "whatsapp" => "required",
            "tujuan" => "required",
            "keterangan" => "required",

        ], [
            "nama" => "Nama wajib diisi",
            "id_guru_piket" => "Guru piket belum diatur",
            "whatsapp" => "Nomor whatsapp wajib diisi",
            "tujuan" => "Tujuan wajib diisi",
            "keterangan" => "Keterangan tambahan wajib diisi",
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }



        $tamu_created = Tamu::create($request->all());
        $id_tamu_created = $tamu_created->id_tamu;

        return redirect()->back()->with([
            "success" => true,
            "id_tamu" => $id_tamu_created
        ]);
    }
    public function dispensasi(string $id_dispen)
    {

        try {
            $dispensasi = Tamu::findOrFail($id_dispen)->toArray();
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
                ]
            ]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render("NotFoundDispen");
        }
    }
}
