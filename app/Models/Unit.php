<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
    use HasFactory;

    public function regimes()
    {
        return $this->hasMany('App\Models\Regime');
    }
    
    use SoftDeletes;
}
