<?php

namespace App\Listeners;

use App\Events\ReportGenerated;
use App\Mail\ReportGeneratedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendReportEmail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ReportGenerated $event): void
    {
        $report = $event->report->load('user', 'networks');
        $to = 'saschatech@gmail.com';

        if(!$to) {
            return;
        }

        Mail::to($to)->send(new ReportGeneratedMail($report));
    }
}
