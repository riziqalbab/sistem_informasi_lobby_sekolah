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
        Schema::create('masuk', function (Blueprint $table) {
            $table->uuid('id_masuk')->primary();
            $table->unsignedBigInteger('id_guru_piket');
            $table->unsignedBigInteger('id_guru');
            $table->text('alasan');
            $table->dateTime('tanggal');
            $table->foreign('id_guru')->references('id_guru')->on('guru');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('masuk');
    }
};
