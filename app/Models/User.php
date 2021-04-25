<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function course(){
        return $this->belongsToMany('App\Models\Course');
    }

    public function roles(){
        return $this->belongsToMany('App\Models\Role');
    }

    public function logs(){
        return $this->hasMany('App\Models\Log');
    }

    public function notifications(){
        return $this->hasMany('App\Models\Notification');
    }

    public function comments(){
        return $this->hasMany('App\Models\Comment');
    }

    public function entries(){
        return $this->belongsToMany('App\Models\Entrie')->withPivot("calificacion", "archivo","fecha","editado","comentario","fecha_calif","comentario_retroalimentacion");
    }

    public function modules(){
        return $this->belongsToMany('App\Models\Module')->withPivot("calificacion");
    }

    public function categorie(){
        return $this->belongsTo('App\Models\Categorie');
    }

    public function grades(){
        return $this->hasMany('App\Models\Grade');
    }

    public function courses(){
        return $this->belongsToMany('App\Models\Course');
    }

    public function drop_requests(){
        return $this->belongsToMany('App\Models\Course','drop_requests');
    }

    public function delete_requests(){
        return $this->belongsToMany('App\Models\Course','delete_requests')->withPivot("comentario","status");
    }

    public function requests(){
        return $this->hasMany('App\Models\Request');
    }

    public function own_reports(){
        return $this->hasMany('App\Models\Report');
    }

    public function  other_reports(){
        return $this->hasMany('App\Models\Report');
    }
    
}
