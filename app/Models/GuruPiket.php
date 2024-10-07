<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuruPiket extends Model
{
    use HasFactory;


    protected $table = 'guru_piket';
    protected $primaryKey = 'id';

    public $timestamps = false;
    protected $fillable = [
        "id_guru",
        "tanggal"
    ];


    public function guru()
    {
        return $this->belongsTo(Guru::class, 'id_guru', 'id_guru');
    }
}
