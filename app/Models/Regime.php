<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regime extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->hasMany('App\Models\User');
    }

    public function unit()
    {
        return $this->belongsTo('App\Models\Unit');
    }
}
