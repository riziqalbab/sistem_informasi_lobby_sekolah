<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Tamu extends Model
{
    use HasFactory;
    use HasUuids;


    protected $table = "tamus";
    protected $primaryKey = 'id_tamu';

    protected $fillable = [
        "id_guru_piket",
        "id_guru",
        "nama",
        "instansi",
        "whatsapp",
        "tujuan",
        "keterangan"
    ];
    public $timestamps = true;


    public function guru()
    {
        return $this->belongsTo(Guru::class, 'id_guru', 'id_guru');
    }

    public function guruPiket()
    {
        return $this->belongsTo(GuruPiket::class, 'id_guru_piket', 'id');
    }



}
