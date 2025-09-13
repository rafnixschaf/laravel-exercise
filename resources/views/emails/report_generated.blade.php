@component('mail::message')
# Hi {{ $user->name ?? 'there' }}

@component('mail::table')
    | Location | Speed (Mbit/s) |
    |:--|--:|
    @foreach ($networks as $n)
        | {{ $n->location }} | {{ number_format($n->quality_score, 2) }} |
    @endforeach
@endcomponent

@component('mail::button', ['url' => config('app.url').'/network'])
    Report ansehen
@endcomponent
    
@endcomponent
