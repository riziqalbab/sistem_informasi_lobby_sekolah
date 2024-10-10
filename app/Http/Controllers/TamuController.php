<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TamuController extends Controller
{
    public function tambah(){
        return Inertia::render("Tamu/CreateTamu");    
    }
}
