<?php

namespace App\Http\Controllers;

use App\Models\Dispen;
use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\SiswaDispen;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class KeluarController extends Controller
{
    public function __invoke()
    {

        $table_guru_piket = GuruPiket::query()->with("guru")->whereDate('tanggal', Carbon::today())->get()->toArray();
        $guru_piket = count($table_guru_piket) > 0 ? $table_guru_piket[0]["guru"] : null;

        $guru = Guru::all();
        return Inertia::render("Keluar", [
            "guru" => $guru,
            "guru_piket" => $guru_piket
        ]);
    }

    public function store(Request $request)
    {

        // Log::info($request->all());
        $validator = Validator::make($request->all(), [
            "siswa" => "required",
            "alasan" => "required",
            "id_guru" => "required",
            "waktu_awal" => "required",
            "id_guru_piket" => "required",
            "whatsapp" => "required",
        ], [
            "siswa" => "Siswa belum diinputkan",
            "id_guru" => "Guru belum diisi",
            "alasan" => "Alasan belum diisi",
            "waktu_awal" => "Waktu mulai harus diisi",
            "id_guru_piket" => "Guru piket belum diatur",
            "whatsapp" => "Nomor whatsapp wajib diisi, untuk verifikasi",
        ]);


        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $is_sampai_pulang = $request->post("waktu_akhir") == null && 1;

        $dispen_created = Dispen::create([
            "id_guru_piket" => $request->post("id_guru_piket"),
            "id_guru" => $request->post("id_guru"),
            "alasan" => $request->post("alasan"),
            "deskripsi" => $request->post("deskripsi"),
            "whatsapp" => $request->post("whatsapp"),
            "waktu_awal" => $request->post("waktu_awal"),
            "waktu_akhir" => $request->post("sampai"),
            "is_sampai_pulang" => $is_sampai_pulang,
        ]);

        $id_dispen = $dispen_created->id_dispen;

        $siswa_dispen = array_map(function ($item) use ($id_dispen, $request) {
            return [
                "id_dispen" => $id_dispen,
                "nis" => $item["nis"],
                "nama" => $item["nama"],
                "kelas" => $item["kelas"],
                "tanggal" => $request->post("waktu_awal"),
                "alasan" => $request->post("alasan"),
            ];
        }, $request->post("siswa"));


        // Log::info($siswa_dispen);
        SiswaDispen::insert($siswa_dispen);


        return redirect()->back()->with("success", "");
    }
}
