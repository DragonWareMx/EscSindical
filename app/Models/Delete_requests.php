<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Delete_requests extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function course()
    {
        return $this->belongsTo('App\Models\Course');
    }
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }



}
