<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
    use HasFactory;

    public function regime()
    {
        return $this->belongsTo('App\Models\Regime');
    }

    public function users()
    {
        return $this->hasMany('App\Models\User');
    }

    use SoftDeletes;
}