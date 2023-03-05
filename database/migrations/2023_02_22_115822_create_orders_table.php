<?php

use App\Models\Market;
use App\Models\User;
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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Market::class);
            $table->string('status'); // pending, win - lose
            $table->string('type'); // high - low
            $table->integer('interval'); // interval in seconds before draw
            $table->integer('win_percentage'); // percentage per interval
            $table->string('buy_amount');
            $table->string('sell_amount')->nullable();
            $table->unsignedBigInteger('amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
