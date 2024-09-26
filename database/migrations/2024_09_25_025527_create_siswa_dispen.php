<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('siswa_dispen', function (Blueprint $table) {
            $table->uuid('id_dispen')->nullable(false);
            $table->string('nis')->nullable(false);
            $table->string('nama')->nullable(false);
            $table->string('kelas')->nullable(false);
            $table->string('tanggal')->nullable(false);
            $table->string('alasan')->nullable(false);

            $table->primary(['id_dispen', 'nis']);
            $table->foreign('id_dispen')->references('id_dispen')->on('dispen');
            $table->foreign('nis')->references('nis')->on('siswa');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa_dispen');
    }
};
