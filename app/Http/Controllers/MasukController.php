<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\Masuk;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MasukController extends Controller
{
    public function __invoke()
    {
        $guru = Guru::all();

        $table_guru_piket = GuruPiket::query()->with("guru")->whereDate('tanggal', Carbon::today())->get()->toArray();
        $guru_piket = count($table_guru_piket) > 0 ? $table_guru_piket[0]["guru"] : null;

        return Inertia::render("Masuk", [
            "guru" => $guru,
            "guru_piket" => $guru_piket,
        ]);
    }

    public function store(Request $request)
    {
        $date_now = Carbon::now()->toDateString();

        $validator = Validator::make($request->all(), [
            "id_guru" => ["required"],
            "id_guru_piket" => ["required"],
        ], [
            "id_guru"=> "Guru Wajib Diisi",
            "id_guru_piket"=> "Guru piket belum diatur",
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        Log::info($request->all());

        $values = [
            "id_guru"=> $request->id_guru,
            "id_guru_piket"=> $request->id_guru_piket,
            "tanggal"=> $date_now,
        ];

        Masuk::create($values);
    }
}
