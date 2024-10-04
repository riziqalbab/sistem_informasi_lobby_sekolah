<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Masuk extends Model
{
    use HasFactory;
    use HasUuids;

    protected $table = "masuk";
    
    protected $primaryKey = 'id_masuk';
    protected $fillable = [
        "id_guru_piket",
        "id_guru",
        "tanggal",
    ];
    public $timestamps = false;
    

}
