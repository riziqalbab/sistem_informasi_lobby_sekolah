<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiswaDispen extends Model
{
    use HasFactory;

    protected $table = "dispen_siswa";
    protected $fillable = ["nama", "kelas", "tanggal", "alasan"];
    public $timestamps = false;
}
