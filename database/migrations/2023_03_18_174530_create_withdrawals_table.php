<?php

use App\Models\User;
use App\Models\Wallet;
use App\Models\WithdrawalAccount;
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
        Schema::create('withdrawals', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignIdFor(User::class)->constrained();
            $table->foreignIdFor(Wallet::class)->constrained();
            $table->foreignIdFor(WithdrawalAccount::class)->constrained();
            $table->string('status');

            $table->string('provider_type');
            $table->string('provider_name');
            $table->string('provider_id');

            $table->string('swift_code')->nullable();
            $table->string('bank_address')->nullable();

            $table->bigInteger('amount');
            $table->longText('remarks')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdrawals');
    }
};
