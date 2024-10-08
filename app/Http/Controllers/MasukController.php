<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\Masuk;
use App\Models\SiswaMasuk;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Mockery\Undefined;

class MasukController extends Controller
{

    public function __invoke()
    {

        $site_url = url("/");


        $guru = Guru::all();
        $table_guru_piket = GuruPiket::query()->with("guru")->whereDate('tanggal', Carbon::today())->get()->toArray();
        $guru_piket = count($table_guru_piket) > 0 ? $table_guru_piket[0] : null;



        return Inertia::render("Masuk", [
            "guru" => $guru,
            "guru_piket" => $guru_piket,
            "site_url" => $site_url
        ]);
    }

    public function store(Request $request)
    {
        $date_now = Carbon::now()->toDateString();

        $validator = Validator::make($request->all(), [
            "id_guru" => ["required"],
            "id_guru_piket" => ["required"],
        ], [
            "id_guru" => "Guru Wajib Diisi",
            "id_guru_piket" => "Guru piket belum diatur",
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $values_dispen = [
            "id_guru" => $request->id_guru,
            "id_guru_piket" => $request->id_guru_piket,
            "tanggal" => $date_now,
        ];
        $masuk_created = Masuk::create($values_dispen);
        $id_masuk = $masuk_created->id_masuk;

        $value_siswa_keluar = array_map(function ($item) use ($id_masuk, $date_now) {
            return [
                "id_masuk" => $id_masuk,
                "nis" => $item["nis"],
                "nama" => $item["nama"],
                "kelas" => $item["kelas"],
                "alasan" => $item["alasan"] ?? "",
                "tanggal" => $date_now
            ];
        }, $request->post("siswa"));

        SiswaMasuk::insert($value_siswa_keluar);


        return redirect()->back()->with([
            "success" => true,
            "id_masuk" => $id_masuk
        ]);
    }

    public function masuk(string $id_masuk)
    {
        return Inertia::render("MasukDetail");
    }
}
