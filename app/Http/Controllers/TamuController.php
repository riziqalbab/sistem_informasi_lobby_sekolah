<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TamuController extends Controller
{
    
    
    public function tambah(){
        $guru = Guru::all();

        return Inertia::render("Tamu/CreateTamu", [
            "guru"=>$guru
        ]);    
    }

    public function store(Request $request){
            
    }
}
