<?php

namespace App\Http\Controllers;

use App\Models\Dispen;
use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\SiswaDispen;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {

        $date_now = Carbon::now()->toDateString();
        $dataCount2Minggu = [];
       
        for ($i = 0; $i <= 50; $i++) {
            $date = date('Y-m-d', strtotime('-' . $i . ' days'));
            $count = Dispen::where('waktu_awal', 'like', '%' . $date . '%')->count();
            $dataCount2Minggu[] = [
                "count"=> $count,
                "label"=>date('d M', strtotime($date))
            ];
        }

        $twoWeeksAgo = Carbon::now()->subWeeks(2);
        $dataDispen2minggu = DB::table('dispen')->where('waktu_awal', '>=', $twoWeeksAgo)->get();



        $guru = Guru::all();

        
        $piket = GuruPiket::where('tanggal', $date_now)
            ->with('guru')  
            ->get()->first();


        $dispen_total = SiswaDispen::all()->count();
        return Inertia::render("Home", [
            "guru" => $guru,
            "guru_piket" => $piket,
            "total_dispen" => $dispen_total,
            "two_weeks_count" => $dataDispen2minggu->count(),
            "two_weeks" => $dataCount2Minggu
        ]);
    }
}
