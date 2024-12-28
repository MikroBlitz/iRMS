<?php

namespace App\GraphQL\Mutations;
use Exception;
use Illuminate\Support\Facades\Hash;
use App\Modules\User\Models\User;

class UserResolver
{
    /**
     * @throws Exception
     */
    public function upsertUser($root, array $args)
    {
        if (!isset($args['input'])) {
            throw new Exception('Input data is missing.');
        }

        $input = $args['input'];

        if (!empty($input['password'])) {
            $input['password'] = Hash::make($input['password']);
        } else {
            unset($input['password']);
        }

        return User::updateOrCreate(
            ['id' => $input['id'] ?? null],
            $input
        );
    }
}
