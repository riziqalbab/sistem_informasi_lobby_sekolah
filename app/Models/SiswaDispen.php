<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiswaDispen extends Model
{
    use HasFactory;

    protected $table = "siswa_dispen";
    protected $fillable = ["id_dispen","id_kelas", "nis", "nama", "tanggal", "alasan"];
    public $timestamps = false;
}
