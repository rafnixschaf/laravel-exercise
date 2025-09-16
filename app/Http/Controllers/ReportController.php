<?php

namespace App\Http\Controllers;

use App\Events\ReportGenerated;
use App\Http\Requests\GeneralBulkRequest;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{

    public function index(Request $request)
    {
        return Inertia::render('reports', [
            'reports' => $request->user()->reports()
                ->with('networks')
                ->get(),
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

    public function destroy(GeneralBulkRequest $request)
    {
        $ids = $request->validated('ids');

        DB::transaction(fn() => Report::whereIn('id', $ids)->delete());

        return back()->with('success', 'Reports deleted successfully.');
    }
}
