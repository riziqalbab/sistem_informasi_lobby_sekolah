<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuruPiket extends Model
{
    use HasFactory;


    protected $table = 'guru_piket';
    protected $primaryKey = 'id_guru_piket';

    public $timestamps = false;
    protected $fillable = [
        "id_guru",
        "tanggal"
    ];


    public function guru()
    {
        return $this->hasOne(Guru::class, "id_guru", "id_guru");
    }
}
