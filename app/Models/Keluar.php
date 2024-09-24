<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keluar extends Model
{
    use HasFactory;

    protected $table = "dispen";
    protected $fillable = ["id_guru_piket", "id_guru", "alasan", "deskripsi", "waktu_awal", "waktu_akhir", "is_sampai_pulang"];
}
