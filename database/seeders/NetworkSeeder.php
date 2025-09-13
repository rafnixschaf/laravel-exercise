<?php

namespace Database\Seeders;

use App\Models\Network;
use Illuminate\Database\Seeder;


class NetworkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Network::factory(10)->create();
    }
}
