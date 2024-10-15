<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\GuruPiket;
use App\Models\Kelas;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MasterController extends Controller
{
    public function kelas(){
        $kelas = Kelas::all();
        return Inertia::render("Master/Kelas", [
            "kelas"=> $kelas
        ]);
    }
    public function storeKelas(Request $request){
        $validator = Validator::make($request->all(), [
            "nama" => ["required", "unique:kelas,nama"],
        ], [
            "nama" => "NAMA KELAS WAJIB DIISI",
            "nama.unique"=> "NAMA KELAS SUDAH ADA"
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        
        Kelas::create($request->all());
        return redirect()->back()->with("success", true);
    }
    public function editKelas(Request $request){

        $id_kelas = $request->all();

        $validator = Validator::make($request->all(), [
            "nama_edit" => ["required", "unique:kelas,nama"],
        ], [
            "nama_edit.required" => "NAMA KELAS WAJIB DIISI",
            "nama_edit.unique"=> "NAMA KELAS SUDAH ADA"
        ]);

        Log::info($id_kelas);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        
        Kelas::where("id_kelas", $request->post("id_kelas"))->update([
            "nama"=> $request->post("nama_edit")
        ]);
        return redirect()->back()->with("success", true);
    }

    public function guru(){
        $guru = Guru::all();

        return Inertia::render("Guru", [
            "guru" => $guru
        ]);
    }

    public function storeGuru(Request $request){
        $validator = Validator::make($request->all(), [
            "nama" => "required",
            "mapel" => "required",
            "whatsapp" => "required|unique:guru,whatsapp",
        ], [
            "nama" => "Nama harus diisi",
            "mapel" => "Mata pelajaran harus diisi",
            "whatsapp" => [
                "required" => "Nomor Whatsapp harus dii",
                "unique" => "Nomor Whatsapp sudah digunakan"
            ]
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }

        Guru::create($request->all());
        return redirect()->back()->with("success", true);
    }

    public function guruPiket(Request $request)
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

    public function editGuru(Request $request){
        $validator = Validator::make($request->all(), [
            "nama_edit" => "required",
            "mapel_edit" => "required",
            "whatsapp_edit" => "required",
        ], [
            "nama_edit" => "Nama harus diisi",
            "mapel_edit" => "Mata pelajaran harus diisi",
            "whatsapp_edit" => [
                "required" => "Nomor Whatsapp harus dii",
            ]
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }


        


        Guru::where("id_guru", $request->post("id_guru"))->update([
            "nama"=> $request->post("nama_edit"),
            "mapel"=> $request->post("mapel_edit"),
            "whatsapp"=> $request->post("whatsapp_edit"),
        ]);

        return redirect()->back()->with("success", true);

    }
}
