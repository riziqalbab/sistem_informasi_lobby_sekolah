<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
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
}
