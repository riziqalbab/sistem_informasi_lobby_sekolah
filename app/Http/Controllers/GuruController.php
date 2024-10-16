<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\GuruPiket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class GuruController extends Controller
{
  

    public function delete(string $id_guru)
    {
        $guru = Guru::where(["id_guru" => $id_guru]);
        $guru->delete();
    }

    public function piket(Request $request)
    {
        $date = Carbon::now()->toDateString();
        $piket_now = GuruPiket::where("tanggal", $date)->first();


        if(isset($piket_now)) {
            GuruPiket::where("tanggal", $date)->update([
                "id_guru" => $request->post("id_guru"),
            ]);
        } 

        if(!isset($piket_now)) {    
            GuruPiket::insert([
                [
                    "id_guru" => $request->post("id_guru"),
                    "tanggal" => $date
                ]
            ]);
        }
    }
}
