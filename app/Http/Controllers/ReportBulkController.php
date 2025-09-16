<?php

namespace App\Http\Controllers;

use App\Http\Requests\GeneralBulkRequest;
use App\Models\Report;
use Illuminate\Support\Facades\DB;

class ReportBulkController extends Controller
{

    public function destroy(GeneralBulkRequest $request)
    {
        $ids = $request->validated('ids');

        DB::transaction(fn() => Report::whereIn('id', $ids)->delete());

        return back()->with('success', 'Reports deleted successfully.');
    }
}
