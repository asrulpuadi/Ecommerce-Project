<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgetPasswordRequest;
use App\Models\User;
use App\Mail\ForgetPasswordMail;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Exception;

class ForgetPasswordController extends Controller
{
    public function ForgetPassword(ForgetPasswordRequest $request)
    {
        $email = $request->email;

        if (User::where('email', $email)->doesntExist()) {
            return response()->json([
                'message' => 'Email Invalid'
            ], 401);
        } else {
            $token = rand(10, 100000);

            try {
                DB::table('password_reset_tokens')->insert([
                    'email' => $request->email,
                    'token' => $token
                ]);

                Mail::to($email)->send(new ForgetPasswordMail($token));

                return response()->json([
                    'message' => 'Check your email for Reset Password'
                ], 200);
            } catch (Exception $exception) {
                return response([
                    'message' => $exception->getMessage()
                ], 400);
            }
        }
    }
}
