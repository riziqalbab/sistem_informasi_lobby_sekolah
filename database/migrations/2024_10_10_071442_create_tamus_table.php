<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tamus', function (Blueprint $table) {
            $table->uuid("id_tamu")->primary();
            $table->unsignedBigInteger("id_guru")->nullable();
            $table->unsignedBigInteger("id_guru_piket")->nullable();
            $table->string("nama");
            $table->string("instansi");
            $table->string('whatsapp');
            $table->string('tujuan');
            $table->string("keterangan");
            $table->timestamps();


            $table->foreign("id_guru")->references("id_guru")->on("guru");
            $table->foreign("id_guru_piket")->references("id")->on("guru_piket");
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
