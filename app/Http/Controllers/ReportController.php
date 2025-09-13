<?php

namespace App\Http\Controllers;

use App\Events\ReportGenerated;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller {

    public function index(Request $request)
    {
        return Inertia::render('network', [
            'reports' => $request->user()->reports()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $report = $user->reports()->create([]);

        $network_ids = $user->networks()->pluck('id');

        $report->networks()->sync($network_ids);

        ReportGenerated::dispatch($report);

        return back()->with('success', 'Report created successfully.');
    }
}
