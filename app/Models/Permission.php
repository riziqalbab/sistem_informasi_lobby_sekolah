<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Permission extends Model
{
    use HasFactory;

    protected $table = "permission";
    protected $primaryKey = 'id_permission';
    protected $fillable = ["id_role", "nama"];

    public $timestamps = false;



    public function role(): BelongsTo{
        return $this->belongsTo(Role::class, "id_role", "id_role");
    }
}
