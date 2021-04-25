<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training_type extends Model
{
    use HasFactory;

    public function course(){
        return $this->belongsToMany('App\Models\Course');
    }

    public function category(){
        return $this->belongsToMany('App\Models\Category');
    }
}
