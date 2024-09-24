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
        Schema::create('guru', function (Blueprint $table) {
            $table->bigInteger('id_guru')->autoIncrement()->primary();
            $table->string("nama")->nullable();
            $table->string("mapel_ajar")->nullable();
            $table->string("whatsapp");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guru');
    }
};
