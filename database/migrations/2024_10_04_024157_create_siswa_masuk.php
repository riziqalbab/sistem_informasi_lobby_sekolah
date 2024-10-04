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
        Schema::create('siswa_masuk', function (Blueprint $table) {
            $table->uuid('id_masuk')->nullable(false);
            $table->string('nis')->nullable(false);
            $table->string('nama')->nullable(false);
            $table->string('kelas')->nullable(false);
            $table->string('tanggal')->nullable(false);
            $table->string('alasan')->nullable(false);

            $table->primary(['id_masuk', 'nis']);
            $table->foreign('id_masuk')->references('id_masuk')->on('masuk');
            $table->foreign('nis')->references('nis')->on('siswa');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa_masuk');
    }
};
