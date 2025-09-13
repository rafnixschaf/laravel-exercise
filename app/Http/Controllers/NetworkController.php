<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NetworkController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('network', [
            'networks' => $request->user()->networks()->get(),
        ]);
    }
    public function store(Request $request) {

        $validated = $request->validate([
            'location' => ['required', 'string', 'max:255'],
            'quality_score' => ['required', 'numeric', 'min:0', 'max:100'],
        ]);

        $request->user()->networks()->create($validated);

        return back()->with('success', 'Network added successfully.');
    }

}
