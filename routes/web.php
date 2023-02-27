<?php

use App\Http\Controllers\MarketController;
use App\Http\Controllers\MinerController;

use App\Http\Controllers\User\ActiveMinerController;
use App\Http\Controllers\User\DepositController;
use App\Http\Controllers\User\PasswordController;
use App\Http\Controllers\User\PinController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\SecurityController;
use App\Http\Controllers\User\WalletAddressController;
use App\Http\Controllers\User\WalletController;
use App\Http\Controllers\User\WithdrawalAccountController;
use App\Http\Controllers\User\WithdrawalController;
use App\Http\Controllers\User\UserVerificationController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn () => redirect()->route('dashboard'));
Route::get('/dashboard', fn () => Inertia::render('User/Dashboard'))->name('dashboard');

Route::resource('markets', MarketController::class)->only('index', 'show');

Route::middleware('auth')->group(function () {
    Route::get('miners', [MinerController::class, 'index'])->name('miners.index');

    Route::prefix('/user')->as('user.')->group(function () {
        Route::get('/deposits', [DepositController::class, 'index'])->name('deposits.index');
        Route::post('/deposits', [DepositController::class, 'store'])->name('deposits.store');

        Route::get('/withdrawals', [WithdrawalController::class, 'index'])->name('withdrawals.index');
        Route::post('/withdrawals', [WithdrawalController::class, 'store'])->name('withdrawals.store');

        Route::get('/withdrawal-accounts', [WithdrawalAccountController::class, 'index'])->name('withdrawals.accounts.index');
        Route::post('/withdrawal-accounts', [WithdrawalAccountController::class, 'store'])->name('withdrawals.accounts.store');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::patch('/wallet-address', [WalletAddressController::class, 'update'])->name('wallet_address.update');

        Route::get('/wallet', [WalletController::class, 'index'])->name('wallet.index');

        Route::get('/miners', [ActiveMinerController::class, 'index'])->name('miners.index');
        Route::post('/miners', [ActiveMinerController::class, 'store'])->name('miners.store');

        Route::get('/security', [SecurityController::class, '__invoke'])->name('security.edit');
        Route::patch('/password', [PasswordController::class, 'update'])->name('password.update');

        Route::post('/pin', [PinController::class, 'store'])->name('pin.update');
        Route::patch('/pin', [PinController::class, 'update'])->name('pin.update');

        Route::post('verifications', [UserVerificationController::class, 'update'])->name('verification.store');
    });
});

require __DIR__ . '/auth.php';
