<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Entry extends Model
{
    use HasFactory;

    public function module(){
        return $this->belongsTo('App\Models\Module');
    }

    public function comments(){
        return $this->hasMany('App\Models\Comment');
    }

    public function users(){
        return $this->belongsToMany('App\Models\User')->withTimestamps()->withPivot('calificacion','archivo');
    }

    public function files(){
        return $this->hasMany('App\Models\File');
    }

    use SoftDeletes;
}
