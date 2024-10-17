<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiswaDispen extends Model
{
    use HasFactory;

    protected $table = "siswa_dispen";
    protected $fillable = ["id_dispen", "id_kelas", "nis", "nama", "tanggal", "alasan"];
    public $timestamps = false;


    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class, "id_kelas", "id_kelas");
    }

    public function dispen(): BelongsTo
    {
        return $this->belongsTo(Dispen::class, "id_dispen", "id_dispen");
    }
}
