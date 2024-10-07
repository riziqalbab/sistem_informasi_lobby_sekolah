<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('masuk', function (Blueprint $table) {
            $table->uuid('id_masuk')->primary();
            $table->unsignedBigInteger('id_guru_piket');
            $table->unsignedBigInteger('id_guru');
            $table->date('tanggal');

            $table->foreign('id_guru_piket')->references('id')->on('guru_piket');
            $table->foreign('id_guru')->references('id_guru')->on('guru');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('masuk');
    }
};
