<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Permission\Models\Role;
use App\Permission\Models\Permission;
use App\Models\User;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $rolAdmin = Role::create([
            'name' => 'Administrador',
            'slug' => 'admin',
            'description' => 'Administrador',
            'full-access' => 'no'
        ]);
        $rolPonente = Role::create([
            'name' => 'Ponente',
            'slug' => 'ponente',
            'description' => 'ponente',
            'full-access' => 'no'
        ]);
        $rolAlumno = Role::create([
            'name' => 'Alumno',
            'slug' => 'alumno',
            'description' => 'alumno',
            'full-access' => 'no'
        ]);


        $user1 = User::find(1);

        $user1->roles()->sync([$rolAdmin->id]);

        //permisos
        $permission_all = [];
        $permission_pon = [];
        $permission_adm = [];
        $permission_al = [];


        ///////////////permisos para Usuarios//////////////////////////////////////////////////////////////////////////
        $permission = Permission::create([
            'name' => 'Alumno',
            'slug' => 'alumno.perm',
            'description' => 'El usuario es un Alumno'
        ]);
        $permission_all[] = $permission->id;
        $permission_al[] = $permission->id;

        $permission = Permission::create([
            'name' => 'Admin',
            'slug' => 'admin.perm',
            'description' => 'El usuario es un Admin'
        ]);
        $permission_all[] = $permission->id;
        $permission_adm[] = $permission->id;

        $permission = Permission::create([
            'name' => 'Ponente',
            'slug' => 'ponente.perm',
            'description' => 'El usuario es un Ponente'
        ]);
        $permission_all[] = $permission->id;
        $permission_pon[] = $permission->id;

        $rolAdmin->permissions()->sync($permission_adm);
        $rolPonente->permissions()->sync($permission_pon);
        $rolAlumno->permissions()->sync($permission_al);
    }
}