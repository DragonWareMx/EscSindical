<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'apellido_p' => $this->faker->name,
            'apellido_m' => $this->faker->name,
            'fecha_nac' => '1999-12-04',
            'estado' => Str::random(10),
            'ciudad' => Str::random(10),
            'colonia' => Str::random(10),
            'calle' => Str::random(10),
            'num_ext' => '2',
            'num_int' => '2',
            'cp' => '1234',
            'tarjeton_pago' => Str::random(10),
            'matricula' => Str::random(10),
            'categorie_id' => 1,
            'sexo' => 'Masculino'
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
