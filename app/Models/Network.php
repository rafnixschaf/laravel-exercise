<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Network extends Model
{
    use HasFactory;

    protected $fillable = [
        'location',
        'quality_score',
    ];

    public function user(): belongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reports(): belongsToMany{
        return $this->belongsToMany(Report::class);
    }
}
