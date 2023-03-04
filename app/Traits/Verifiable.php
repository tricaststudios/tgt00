<?php

namespace App\Traits;

use App\Models\UserVerification;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 *
 */
trait Verifiable
{
    /**
     * Undocumented function
     *
     * @return HasOne
     */
    public function verification(): HasOne
    {
        return $this->hasOne(UserVerification::class, 'user_id');
    }

    /**
     * Undocumented function
     *
     * @return boolean
     */
    public function isVerified(): bool
    {
        if (!$this->verification)
            return false;

        return $this->verification()->status === 'approved';
    }
}
