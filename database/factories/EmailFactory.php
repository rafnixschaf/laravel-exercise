<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class EmailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['pending', 'success', 'error']);

        return [
            'status' => $status,
            'error_message' => $status === 'error' ? fake()->sentence() : null,
            'type' => fake()->randomElement(['report']),
            'user_id' => User::factory(),
        ];
    }
}
