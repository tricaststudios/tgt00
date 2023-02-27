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
        Schema::create('miners', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('name');
            $table->string('slug')->unique();
            $table->bigInteger('min_amount');
            $table->bigInteger('max_amount');
            $table->bigInteger('lock_days');
            $table->unsignedDecimal('daily_rate', 15, 2);
            $table->boolean('is_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('miners');
    }
};
