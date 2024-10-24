<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    public function handle(Request $request, Closure $next)
    {

        $id_role = $request->user()->id_role;
        $role = Role::find($id_role);
        $path = $request->path();
        $permission = DB::select("SELECT permission.nama AS nama_permission FROM permission INNER JOIN roles ON permission.id_role = $id_role WHERE roles.nama='$path'");

        Log::info($role->nama);
        if ($permission || $role->nama == "root") {
            return $next($request);
        }

        return redirect("/");
    }
}
