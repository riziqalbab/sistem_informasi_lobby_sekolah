<?php

namespace Database\Seeders;

use App\Models\Kelas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class kelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kelas::insert([
            ["nama" => "X PPLG 1"],
            ["nama" => "X PPLG 2"],
            ["nama" => "X AKL 1"],
            ["nama" => "X AKL 2"],
            ["nama" => "X AKL 3"],
            ["nama" => "X AKL 4"],
            ["nama" => "X DKV 1"],
            ["nama" => "X DKV 2"],
            ["nama" => "X PMS 1"],
            ["nama" => "X PMS 2"],
            ["nama" => "X PMS 3"],
            ["nama" => "X MPLB 1"],
            ["nama" => "X MPLB 2"],
            ["nama" => "X MPLB 3"],

            ["nama" => "XI PPLG 1"],
            ["nama" => "XI PPLG 2"],
            ["nama" => "XI AKL 1"],
            ["nama" => "XI AKL 2"],
            ["nama" => "XI AKL 3"],
            ["nama" => "XI AKL 4"],
            ["nama" => "XI DKV 1"],
            ["nama" => "XI DKV 2"],
            ["nama" => "XI PMS 1"],
            ["nama" => "XI PMS 2"],
            ["nama" => "XI PMS 3"],
            ["nama" => "XI MPLB 1"],
            ["nama" => "XI MPLB 2"],
            ["nama" => "XI MPLB 3"],

            ["nama" => "XII PPLG 1"],
            ["nama" => "XII PPLG 2"],
            ["nama" => "XII AKL 1"],
            ["nama" => "XII AKL 2"],
            ["nama" => "XII AKL 3"],
            ["nama" => "XII AKL 4"],
            ["nama" => "XII DKV 1"],
            ["nama" => "XII DKV 2"],
            ["nama" => "XII PMS 1"],
            ["nama" => "XII PMS 2"],
            ["nama" => "XII PMS 3"],
            ["nama" => "XII MPLB 1"],
            ["nama" => "XII MPLB 2"],
            ["nama" => "XII MPLB 3"]
        ]);
    }
}
