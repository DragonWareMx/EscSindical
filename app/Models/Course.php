<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory;

    public function images()
    {
        return $this->hasMany('App\Models\Image');
    }

    public function tags()
    {
        return $this->belongsToMany('App\Models\Tag');
    }


    public function modules()
    {
        return $this->hasMany('App\Models\Module');
    }


    public function training_types()
    {
        return $this->belongsToMany('App\Models\Training_type');
    }

    public function grades()
    {
        return $this->hasMany('App\Models\Grade');
    }

    public function users()
    {
        return $this->belongsToMany('App\Models\User')->withPivot('calificacion_final');
    }

    public function teacher()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function requests()
    {
        return $this->belongsToMany('App\Models\User', 'requests')->withTimestamps();
    }

    // results in a "problem", se examples below
    public function waitingRequests() {
        return $this->requests()->where('status', 'En espera');
    }

    public function delete_request()
    {
        return $this->belongsToMany('App\Models\User', 'delete_requests')->withPivot("comentario", "status");
    }

    public function drop_request()
    {
        return $this->belongsToMany('App\Models\User', 'drop_requests');
    }

    use SoftDeletes;
}