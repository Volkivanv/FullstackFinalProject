<?php

namespace App\Http\Controllers;

use Illuminate\Console\Scheduling\Event as SchedulingEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Psy\Readline\Hoa\Event as HoaEvent;
use Symfony\Contracts\EventDispatcher\Event;

class EventsController extends Controller
{
    // public function show(Event $event)
    // {
    //     return Inertia::render('Event/Show', [
    //         'event' => $event->only(
    //             'id',
    //             'title',
    //             'start_date',
    //             'description',
    //         ),
    //     ]);
    // }
}
