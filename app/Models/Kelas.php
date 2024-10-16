<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kelas extends Model
{
    use HasFactory;

    protected $table = "kelas";
    protected $fillable = ["nama"];
    public $timestamps = false;


    public function siswa(): HasMany
    {
        return $this->hasMany(Siswa::class, "id_kelas", "id_kelas");
    }
    public function keluar(): HasMany
    {
        return $this->hasMany(SiswaDispen::class, "id_kelas", "id_kelas");
    }
    public function terlambat(): HasMany
    {
        return $this->hasMany(SiswaMasuk::class, "id_kelas", "id_kelas");
    }
}
