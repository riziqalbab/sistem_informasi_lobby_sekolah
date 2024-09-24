<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dispen', function (Blueprint $table) {
            $table->uuid('id_dispen')->primary();
            $table->unsignedBigInteger('id_guru_piket');
            $table->unsignedBigInteger('id_guru');
            $table->text('alasan');
            $table->text('deskripsi')->nullable();
            $table->dateTime('waktu_awal');
            $table->dateTime('waktu_akhir')->nullable();
            $table->boolean('is_sampai_pulang')->default(true);

            $table->foreign('id_guru_piket')->references('id_guru_piket')->on('guru_piket');
            $table->foreign('id_guru')->references('id_guru')->on('guru');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dispen');
    }
};
