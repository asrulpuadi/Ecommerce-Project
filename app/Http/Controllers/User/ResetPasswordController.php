<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class ResetPasswordController extends Controller
{
    public function ResetPassword(ResetPasswordRequest $request)
    {
        $pincode = $request->pincode;
        $email = $request->email;
        $password = Hash::make($request->password);

        $emailCheck = User::where('email', $email)->first();
        $pincodeCheck = DB::table('password_reset_tokens')->where('token', $pincode)->first();

        if (!$emailCheck && !$pincodeCheck) {
            return response([
                'message' => "Email or Pin Code Invalid"
            ], 401);
        } else if (!$emailCheck) {
            return response([
                'message' => "Email Not Found"
            ], 401);
        } else if (!$pincodeCheck) {
            return response([
                'message' => "Pin Code Invalid"
            ], 401);
        } else {
            User::where('email', $email)
                ->update(['password' => $password]);

            DB::table('password_reset_tokens')->where('email', $email)->delete();

            return response()->json([
                'message' => 'Password Change Successfully'
            ], 200);
        }
    }
}
