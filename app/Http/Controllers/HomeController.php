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


        $guru = Guru::all();
        $table_guru_piket = GuruPiket::query()->with("guru")->whereDate('tanggal', Carbon::today())->get()->toArray();

        $dispen = SiswaDispen::all()->count();

        Log::info($dispen);

        $guru_piket = count($table_guru_piket) > 0 ? $table_guru_piket[0]["guru"] : null;
        return Inertia::render("Home", [
            "guru" => $guru,
            "guru_piket" => $guru_piket,
            "total_masuk"
        ]);
    }
}
