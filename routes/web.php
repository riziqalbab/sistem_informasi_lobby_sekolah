<?php

use App\Http\Controllers\GuruController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KeluarController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", HomeController::class);
Route::get("/siswa", SiswaController::class)->name("Siswa");
Route::get("/guru", GuruController::class);
Route::get("/keluar", KeluarController::class);
Route::get("/masuk", KeluarController::class);


// POST
Route::post("/siswa/store", [SiswaController::class, "store"]);
Route::post("/guru/store", [GuruController::class, "store"]);




Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
