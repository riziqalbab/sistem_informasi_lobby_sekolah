<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiswaMasuk extends Model
{
    use HasFactory;
    protected $table = "siswa_masuk";
    protected $fillable = ["id_masuk", "nis", "nama", "kelas", "tanggal", "alasan"];
    public $timestamps = false;
}
