<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterController extends Controller
{
    public function kelas(){
        return Inertia::render("Master/Kelas");
    }
    public function storeKelas(Request $request){
        
    }
}
