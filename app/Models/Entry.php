<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    use HasFactory;

    public function module(){
        return $this->belongsTo('App\Models\Module');
    }

    public function comment(){
        return $this->hasMany('App\Models\Comment');
    }

    public function user(){
        return $this->belongsToMany('App\Models\User');
    }
}
