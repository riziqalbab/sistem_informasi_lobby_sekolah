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

Route::get("/siswa/{nis}", [SiswaController::class, "getOne"]);
Route::get("/siswa", SiswaController::class)->name("Siswa");
Route::post("/siswa/store", [SiswaController::class, "store"]);

Route::get("/keluar", KeluarController::class);
Route::post("/keluar/store", [KeluarController::class, "store"]);


Route::delete("/guru/delete/{id_guru}", [GuruController::class, "delete"]);
Route::get("/guru", GuruController::class);
Route::post("/guru/store", [GuruController::class, "store"]);
Route::post("/guru/piket/store", [GuruController::class, "piket"]);




Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
