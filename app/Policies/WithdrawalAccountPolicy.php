<?php

namespace App\Policies;

use App\Models\User;
use App\Models\WithdrawalAccount;
use Illuminate\Auth\Access\Response;

class WithdrawalAccountPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, WithdrawalAccount $withdrawalAccount): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, WithdrawalAccount $withdrawalAccount): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, WithdrawalAccount $withdrawalAccount): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, WithdrawalAccount $withdrawalAccount): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, WithdrawalAccount $withdrawalAccount): bool
    {
        return false;
    }
}
