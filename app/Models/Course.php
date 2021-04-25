<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    public function image(){
        return $this->belongsToMany('App\Models\Image');
    }

    
    public function tag(){
        return $this->belongsToMany('App\Models\Tag');
    }

    
    public function module(){
        return $this->hasMany('App\Models\Module');
    }

    
    public function training_type(){
        return $this->belongsToMany('App\Models\Training_type');
    }

    public function grade(){
        return $this->hasMany('App\Models\Grade');
    }

    public function user(){
        return $this->belongsToMany('App\Models\User');
    }

    public function userTeach(){
        return $this->belongsTo('App\Models\User');
    }

    public function request(){
        return $this->belongsToMany('App\Models\User');
    }

    public function delete_request(){
        return $this->belongsToMany('App\Models\User');
    }

    public function drop_request(){
        return $this->belongsToMany('App\Models\User');
    }

}
