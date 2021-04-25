<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    public function course(){
        return $this->belongsTo('App\Models\Course');
    }

    public function user(){
        return $this->belongsToMany('App\Models\User');
    }

    public function entry(){
        return $this->hasMany('App\Models\Entry');
    }
}
