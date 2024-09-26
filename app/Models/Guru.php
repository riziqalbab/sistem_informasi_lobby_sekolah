<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    use HasFactory;
    protected $table = "guru";
    protected $fillable = ["nama", "mapel", "whatsapp"];
    public $timestamps = false;


    public function piket()
    {
        return $this->belongsTo(Guru::class, "guru_id", "guru_id");
    }
}
