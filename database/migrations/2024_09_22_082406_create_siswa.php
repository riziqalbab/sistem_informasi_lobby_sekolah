<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {

        Schema::create('siswa', function (Blueprint $table) {
            $table->string("nis")->primary()->unique();
            $table->unsignedBigInteger("id_kelas");
            $table->string("nama")->nullable();
            $table->foreign("id_kelas")->references("id_kelas")->on("kelas")->onDelete('cascade');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('siswa');
    }
};
