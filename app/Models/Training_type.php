<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Training_type extends Model
{
    use HasFactory;

    public function courses(){
        return $this->belongsToMany('App\Models\Course');
    }

    public function categories(){
        return $this->belongsToMany('App\Models\Category');
    }
    
    use SoftDeletes;
}
