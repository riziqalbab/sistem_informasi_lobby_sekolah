<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory;

    protected $table = "roles";
    protected $primaryKey = 'id_role';
    protected $fillable = ["nama"];
    public $timestamps = false;

    
    public function permission(): HasMany{
        return $this->hasMany(Permission::class, "id_role", "id_role");
    }
}
