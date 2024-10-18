<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StatController extends Controller
{
    public function __invoke()
    {


        $count_kelas_dispensasi = DB::select("SELECT kelas.nama AS nama_kelas, COUNT(siswa_dispen.id_dispen) AS jumlah_dispen FROM siswa_dispen JOIN kelas ON siswa_dispen.id_kelas = kelas.id_kelas GROUP BY kelas.nama");
        $count_kelas_terlambat = DB::select("SELECT kelas.nama AS nama_kelas, COUNT(siswa_masuk.id_masuk) AS jumlah_masuk FROM siswa_masuk JOIN kelas ON siswa_masuk.id_kelas = kelas.id_kelas GROUP BY kelas.nama");
        $perbandingan_dispen_terlambat = DB::select("SELECT COUNT(*) AS jumlah, 'keluar' AS label FROM siswa_dispen UNION SELECT COUNT(*) AS jumlah, 'terlambat' AS label FROM siswa_masuk");

        Log::info($perbandingan_dispen_terlambat);
        return Inertia::render("Stat/IndexStat", [
            "count_kelas_dispensasi" => $count_kelas_dispensasi,
            "perbandingan_dispen_terlambat" => $perbandingan_dispen_terlambat,
            "count_kelas_terlambat"=> $count_kelas_terlambat
        ]);
    }
}
