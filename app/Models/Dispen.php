<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Dispen extends Model
{
    use HasFactory;
    use HasUuids;


    protected $table = "dispen";
    protected $primaryKey = 'id_dispen';

    protected $fillable = [
        "id_guru_piket",
        "id_guru",
        "alasan",
        "deskripsi",
        "whatsapp",
        "waktu_awal",
        "waktu_akhir",
        "is_sampai_pulang"
    ];

    public function dispen_siswa(): BelongsToMany
    {
        return $this->belongsToMany(Siswa::class, "siswa_dispen", "id_dispen", "nis");
    }
}
