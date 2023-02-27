<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Market extends Model
{
    use HasFactory;

    protected $casts = [
        'metadata' => 'json',
    ];

    public function getRouteKeyName()
    {
        return 'symbol';
    }
}
