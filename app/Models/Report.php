<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use HasFactory;

    public function reported(){
        return $this->belongsTo('App\Models\User','reported');
    }

    public function reporter(){
        return $this->belongsTo('App\Models\User','reporter');
    }
    
    use SoftDeletes;

}
