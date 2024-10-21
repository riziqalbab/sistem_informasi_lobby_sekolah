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
            $table->text('whatsapp')->nullable();
            $table->dateTime('waktu_awal');
            $table->dateTime('waktu_akhir')->nullable();
            $table->boolean('is_sampai_pulang')->default(true);
            $table->enum("status", ["pending", "accepted", "rejected"])->default("pending");

            $table->foreign('id_guru')->references('id_guru')->on('guru');
            $table->foreign('id_guru_piket')->references('id')->on('guru_piket');
     
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dispen');
    }
};
