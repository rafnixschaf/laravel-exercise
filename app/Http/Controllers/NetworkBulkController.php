<?php

namespace App\Http\Controllers;

use App\Http\Requests\NetworkBulkRequest;
use App\Models\Network;
use Illuminate\Support\Facades\DB;


class NetworkBulkController extends Controller
{
    public function destroy(NetworkBulkRequest $request)
    {
        $ids = $request->validated('ids');

        DB::transaction(fn() => Network::whereIn('id', $ids)->delete());

        return back()->with('success', 'Networks deleted successfully.');
    }
}
