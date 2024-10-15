<?php

namespace App\Http\Controllers;

use App\Models\Dispen;
use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\Masuk;
use App\Models\SiswaDispen;
use App\Models\SiswaMasuk;
use App\Models\Tamu;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        $date_now = Carbon::now()->toDateString();
        $dataCount2Minggu = [];
        $dataCountTerlambat = [];
       
        for ($i = 0; $i <= 50; $i++) {
            $date = date('Y-m-d', strtotime('-' . $i . ' days'));
            $count = SiswaDispen::where('tanggal', 'like', '%' . $date . '%')->count();
            $dataCount2Minggu[] = [
                "count"=> $count,
                "label"=>date('d M', strtotime($date))
            ];
        }
        for ($i = 0; $i <= 50; $i++) {
            $date = date('Y-m-d', strtotime('-' . $i . ' days'));
            $count = Masuk::where('tanggal', 'like', '%operator: ' . $date . '%')->count();
            $dataCountTerlambat[] = [
                "count"=> $count,
                "label"=>date('d M', strtotime($date))
            ];
        }


        $twoWeeksAgo = Carbon::now()->subWeeks(2);
        $dataDispen2minggu = DB::table('siswa_dispen')->where('tanggal', '>=', $twoWeeksAgo)->get();
        $dataDispen2minggu_terlambat = DB::table('siswa_masuk')->where('tanggal', '>=', $twoWeeksAgo)->get();



        $tamu_count = Tamu::all()->count();
        $guru = Guru::all();

    
        $piket = GuruPiket::where('tanggal', $date_now)
            ->with('guru')  
            ->get()->first();


        $dispen_total = SiswaDispen::all()->count();
        $masuk_total = SiswaMasuk::all()->count();
        return Inertia::render("Home", [
            "guru" => $guru,
            "guru_piket" => $piket,
            "tamu_count"=>$tamu_count,
            "total_dispen" => $dispen_total,
            "total_terlambat" => $masuk_total,
            "two_weeks_count" => $dataDispen2minggu->count(),
            "two_weeks_count_terlambat" => $dataDispen2minggu_terlambat->count(),
            "two_weeks" => array_reverse($dataCount2Minggu),
            "two_weeks_terlambat" => array_reverse($dataCountTerlambat)
            
        ]);
    }
}
