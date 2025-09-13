<?php

use App\Http\Controllers\NetworkBulkController;
use App\Http\Controllers\NetworkController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('network.index');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])
    ->prefix('network')
    ->name('network.')
    ->group(function () {
        Route::get('/', [NetworkController::class, 'index'])->name('index');
        Route::post('/', [NetworkController::class, 'store'])->name('store');
    });

Route::middleware('auth')
    ->prefix('networks')
    ->name('networks.')
    ->group(function () {
        Route::delete('/', [NetworkBulkController::class, 'destroy'])->name('destroy');
    });

Route::middleware('auth')
    ->prefix('report')
    ->name('report.')
    ->group(function () {
        Route::get('/', function () {
            return Inertia::render('network');

        })->name('index');
        Route::post('/', [ReportController::class, 'store'])->name('store');
    });

require __DIR__ . '/auth.php';
