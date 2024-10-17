<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiswaMasuk extends Model
{
    use HasFactory;
    protected $table = "siswa_masuk";
    protected $fillable = ["id_masuk", "nis", "nama", "kelas", "tanggal", "alasan"];
    public $timestamps = false;

    public function kelas(): BelongsTo{
        return $this->belongsTo(Kelas::class, "id_kelas", "id_kelas");
    }
}
