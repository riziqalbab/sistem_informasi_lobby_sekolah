<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menu_child', function (Blueprint $table) {
            $table->id("id_menu_child");
            $table->unsignedBigInteger("id_menu");
            $table->unsignedBigInteger("id_role");
            $table->string("nama");
            $table->string("path");

            $table->foreign("id_menu")->references("id_menu")->on("menus");
            $table->foreign("id_role")->references("id_role")->on("roles");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_child');
    }
};
