<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guru_piket', function (Blueprint $table) {
            $table->unsignedBigInteger("id_guru_piket")->primary();
            $table->date('tanggal');
            $table->foreign("id_guru_piket")->references("id_guru")->on("guru");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guru_piket');
    }
};
