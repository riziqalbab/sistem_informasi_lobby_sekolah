<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::insert([
            [
                "nama"=> "root"
            ],
            [
                "nama"=> "admin"
            ],
            [
                "nama"=> "piket"
            ],
        ]);

        Permission::create([
            "id_role" => 1,
            "nama" => "/admin"
        ]);
    }
}
