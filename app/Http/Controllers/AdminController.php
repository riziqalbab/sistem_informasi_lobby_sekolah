<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __invoke()
    {
        return Inertia::render("Admin/IndexAdmin");
    }

    public function pathPermission()
    {
        $roles = Role::all();
        $permission = DB::select("SELECT permission.id_permission, permission.nama AS path, roles.nama AS nama_role FROM permission JOIN roles ON permission.id_role = roles.id_role");
        return Inertia::render("Admin/Path/IndexPath", [
            "roles" => $roles,
            "permission"=> $permission
        ]);
    }
    public function storePathPermission(Request $request)
    {

        $request->validate([
            "id_role" => ["required"],
            "nama" => ["required"]
        ], [
            "id_role" => "Role wajib diisi",
            "nama" => "Path wajib diisi"
        ]);


        Log::info($request->all());

        Permission::insert($request->all());


    }
}
