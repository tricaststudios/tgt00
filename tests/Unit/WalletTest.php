<?php

namespace Tests\Unit;

use App\Actions\Wallet\AddBalance;
use App\Actions\Wallet\DeductBalance;
use App\Models\Transaction;
use App\Models\User;
use Tests\TestCase;

class WalletTest extends TestCase
{
    /** @test */
    public function user_automatically_creates_wallet_when_created()
    {
        $user = User::factory()->create();

        $this->assertNotNull($user->wallet());
    }

    /** @test */
    public function can_add_balance()
    {
        $user = User::factory()->create();
        $wallet = $user->wallet();

        $transaction = (new AddBalance)->handle($wallet, $amount = 100000000, 'test-add', $metadata = [
            'lang_code' => $code = 'testing.wallet.add',
            'lang_params' => compact('amount')
        ]);

        $this->assertEquals($amount, $wallet->balance);
    }

    /** @test */
    public function wallet_automatically_adds_transaction_on_addBalance()
    {
        $user = User::factory()->create();
        $wallet = $user->wallet();

        $transaction = (new AddBalance)->handle($wallet, $amount = 100000000, 'test-add', $metadata = [
            'lang_code' => $code = 'testing.wallet.add',
            'lang_params' => compact('amount')
        ]);

        $this->assertCount(1, $wallet->transactions);
        $this->assertEquals($transaction->metadata, Transaction::first()->metadata);
    }

    /** @test */
    public function can_deduct_balance()
    {
        $user = User::factory()->create();
        $wallet = $user->wallet();

        (new AddBalance)->handle($wallet, $addAmount = 100000000, 'test-add', [
            'lang_code' => 'testing.wallet.add',
            'lang_params' => ['amount' => $addAmount]
        ]);

        (new DeductBalance)->handle($wallet, $deductAmount = 50000000, 'test-deduct', [
            'lang_code' => 'testing.wallet.deduct',
            'lang_params' => ['amount' => $deductAmount]
        ]);

        $this->assertEquals($wallet->balance, $addAmount - $deductAmount);
    }

    /** @test */
    public function wallet_automatically_adds_transaction_on_deductBalance()
    {
        $user = User::factory()->create();
        $wallet = $user->wallet();

        $addTransaction = (new AddBalance)->handle($wallet, $addAmount = 100000000, 'test-add', [
            'lang_code' => 'testing.wallet.add',
            'lang_params' => ['amount' => $addAmount]
        ]);

        $deductTransaction = (new DeductBalance)->handle($wallet, $deductAmount = 50000000, 'test-deduct', [
            'lang_code' => 'testing.wallet.deduct',
            'lang_params' => ['amount' => $deductAmount]
        ]);

        $this->assertCount(2, $wallet->transactions);
        $this->assertEquals($addTransaction->metadata, Transaction::first()->metadata);
        $this->assertEquals($deductTransaction->metadata, Transaction::orderByDesc('id')->first()->metadata);
    }
}
