<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Module extends Model
{
    use HasFactory;

    public function course(){
        return $this->belongsTo('App\Models\Course');
    }

    public function users(){
        return $this->belongsToMany('App\Models\User');
    }

    public function entries(){
        return $this->hasMany('App\Models\Entry');
    }
    
    use SoftDeletes;
}
