<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Siswa extends Model
{
    use HasFactory;

    protected $table = "siswa";
    protected $primaryKey = 'nis';
    protected $fillable = ["nis", "nama", "id_kelas"];
    public $timestamps = false;



    public function dispen(): BelongsToMany
    {
        return $this->belongsToMany(Dispen::class, "siswa_dispen", "nis", "id_dispen");
    }
    
    public function masuk(): BelongsToMany{
        
        return $this->belongsToMany(Masuk::class, "siswa_masuk", "nis", "id_masuk");
    }
    public function kelas(): BelongsTo{
        return $this->belongsTo(Kelas::class, "id_kelas", "id_kelas");
    }
}
