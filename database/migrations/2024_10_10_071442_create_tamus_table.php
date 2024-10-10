<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tamus', function (Blueprint $table) {
            $table->id("id_tamu");
            $table->bigInteger("id_guru");
            $table->string("nama");
            $table->string("instansi");
            $table->string('whatsapp');
            $table->string('tujuan');
            $table->string("keterangan");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tamus');
    }
};
