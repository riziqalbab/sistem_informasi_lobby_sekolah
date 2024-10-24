<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $table = "permission";
    protected $primaryKey = 'id_permission';
    protected $fillable = ["id_role", "nama"];
    public $timestamps = false;
}
