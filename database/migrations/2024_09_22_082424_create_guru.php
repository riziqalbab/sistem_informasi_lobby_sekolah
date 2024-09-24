<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guru', function (Blueprint $table) {
            $table->bigIncrements('id_guru')->primary();
            $table->string("nama")->nullable();
            $table->string("mapel")->nullable();
            $table->string("whatsapp");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guru');
    }
};
