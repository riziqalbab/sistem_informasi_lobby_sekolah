<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DispensasiController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KeluarController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\MasukController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\StatController;
use App\Http\Controllers\TamuController;
use App\Http\Controllers\TerlambatController;
use App\Http\Middleware\PermissionMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get("/", HomeController::class);
    Route::get("/statistik", StatController::class);


    Route::middleware(PermissionMiddleware::class)->group(function () {
        Route::get("/admin", AdminController::class);

        Route::get("/keluar", DispensasiController::class);
        Route::get("/keluar/tambah", KeluarController::class);
        Route::post("/keluar/store", [KeluarController::class, "store"]);
        Route::get("/keluar/{id_dispen}", [DispensasiController::class, "dispensasi"]);
        Route::post("/keluar/confirm", [DispensasiController::class, "confirm"]);

        // Route::middleware([PermissionMiddleware::class])->group(function(){
        // });




        Route::get("/masuk", TerlambatController::class);
        Route::get("/masuk/tambah", [TerlambatController::class, "tambah"]);
        Route::post("/masuk/store", [TerlambatController::class, "store"]);


        Route::post("/tamu/confirm", [TamuController::class, 'confirm']);
        Route::get("/tamu", [TamuController::class, 'tamu']);
        Route::get("/tamu/tambah", [TamuController::class, 'tambah']);
        Route::post("/tamu/store", [TamuController::class, 'store']);
        Route::get("/buku/{id_tamu}", [TamuController::class, 'detail']);



        Route::get("/siswa/{nis}", [SiswaController::class, "getOne"]);

        // MASTER PAGE
        Route::get("/master/siswa", SiswaController::class)->name("Siswa");
        Route::post("/master/siswa/store", [SiswaController::class, "store"]);


        Route::get("/master/kelas", [MasterController::class, "kelas"]);
        Route::post("/master/kelas", [MasterController::class, "storeKelas"]);
        Route::post("/master/kelas/edit", [MasterController::class, "editKelas"]);



        Route::get("/master/guru", [MasterController::class, "guru"]);
        Route::post("/master/guru/store", [MasterController::class, "storeGuru"]);
        Route::post("/master/guru/edit", [MasterController::class, "editGuru"]);
        Route::post("/master/guru/piket/store", [MasterController::class, "guruPiket"]);
        Route::delete("/master/guru/delete/{id_guru}", [GuruController::class, "delete"]);

        Route::get("/master", MasterController::class);

        Route::get("/menu", MenuController::class);




        Route::get('/admin/path', [AdminController::class, 'pathPermission']);
        Route::post('/admin/path', [AdminController::class, 'storePathPermission']);

    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::get("/masuk/{id_masuk}", [TerlambatController::class, "detail"]);
Route::get("/tamu/{id_tamu}", [TamuController::class, 'guestDetail']);
Route::get("/terlambat/{id_masuk}", [TerlambatController::class, "detail"]);



require __DIR__ . '/auth.php';
