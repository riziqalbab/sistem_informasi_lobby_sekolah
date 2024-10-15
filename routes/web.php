<?php

use App\Http\Controllers\DispensasiController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KeluarController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\MasukController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TamuController;
use App\Http\Controllers\TerlambatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", HomeController::class);




Route::get("/master/kelas", [MasterController::class, "kelas"]);
Route::post("/master/kelas", [MasterController::class, "storeKelas"]);
Route::post("/master/kelas/edit", [MasterController::class, "editKelas"]);


Route::get("/siswa/{nis}", [SiswaController::class, "getOne"]);
Route::get("/siswa", SiswaController::class)->name("Siswa");
Route::post("/siswa/store", [SiswaController::class, "store"]);


Route::get("/keluar", DispensasiController::class);
Route::get("/keluar/tambah", KeluarController::class);
Route::post("/keluar/store", [KeluarController::class, "store"]);
Route::get("/keluar/{id_dispen}", [DispensasiController::class, "dispensasi"]);

Route::get("/masuk", TerlambatController::class);
Route::get("/masuk/tambah", [TerlambatController::class, "tambah"]);
Route::post("/masuk/store", [TerlambatController::class, "store"]);






Route::get("/tamu", [TamuController::class, 'tamu']);
Route::get("/tamu/tambah", [TamuController::class, 'tambah']);
Route::post("/tamu/store", [TamuController::class, 'store']);
Route::get("/buku/{id_tamu}", [TamuController::class, 'detail']);
Route::get("/tamu/{id_tamu}", [TamuController::class, 'guestDetail']);




Route::delete("/guru/delete/{id_guru}", [GuruController::class, "delete"]);
Route::get("/guru", GuruController::class);
Route::post("/guru/store", [GuruController::class, "store"]);
Route::post("/guru/piket/store", [GuruController::class, "piket"]);



Route::get("/terlambat/{id_masuk}", [TerlambatController::class, "detail"]);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
