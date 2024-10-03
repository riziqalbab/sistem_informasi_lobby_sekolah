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


        date_default_timezone_set("Asia/Jakarta");

        $dataCount2Minggu = [];
       
        for ($i = 0; $i <= 14; $i++) {
            $date = date('Y-m-d', strtotime('-' . $i . ' days'));
            $count = Dispen::where('waktu_awal', 'like', '%' . $date . '%')->count();
            $label2Minggu[] = date('d M', strtotime($date));
            $dataCount2Minggu[] = [
                "count"=> $count,
                "label"=>date('d M', strtotime($date))
            ];
        }

        Log::info(json_encode($dataCount2Minggu));


        $twoWeeksAgo = Carbon::now()->subWeeks(2);
        $dataDispen2minggu = DB::table('dispen')->where('waktu_awal', '>=', $twoWeeksAgo)->get();


        $guru = Guru::all();
        $table_guru_piket = GuruPiket::query()->with("guru")->whereDate('tanggal', Carbon::today())->get()->toArray();

        $dispen_total = SiswaDispen::all()->count();

        $guru_piket = count($table_guru_piket) > 0 ? $table_guru_piket[0]["guru"] : null;
        return Inertia::render("Home", [
            "guru" => $guru,
            "guru_piket" => $guru_piket,
            "total_dispen" => $dispen_total,
            "two_weeks_count" => $dataDispen2minggu->count(),
            "two_weeks" => $dataCount2Minggu
        ]);
    }
}
