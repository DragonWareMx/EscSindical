<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public function users(){
        return $this->hasMany('App\Models\User');
    }

    public function training_types(){
        return $this->belongsToMany('App\Models\Training_type');
    }
}
