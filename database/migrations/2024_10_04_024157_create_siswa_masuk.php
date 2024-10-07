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
            $table->uuid('id_masuk');
            $table->string('nis');
            $table->string('nama');
            $table->string('kelas');
            $table->date('tanggal'); 
            $table->string('alasan');
        
            $table->primary(['id_masuk', 'nis']);
            $table->foreign('id_masuk')->references('id_masuk')->on('masuk')->onDelete('cascade');
            $table->foreign('nis')->references('nis')->on('siswa')->onDelete('cascade');
        
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
