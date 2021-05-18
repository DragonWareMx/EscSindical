<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use HasFactory;

    public function course(){
        return $this->belongsTo('App\Models\Course');
    }
    
    use SoftDeletes;
}
