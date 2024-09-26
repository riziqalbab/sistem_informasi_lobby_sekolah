<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\GuruPiket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {


        $guru = Guru::all();


        $table_guru_piket = GuruPiket::query()->with("guru")->whereDate('tanggal', Carbon::today())->get()->toArray();


        $guru_piket = $table_guru_piket[0];




        // echo json_encode($id_guru_piket);
        return Inertia::render("Home", [
            "guru" => $guru,
            "guru_piket" => "sdsd"
        ]);
    }
}
