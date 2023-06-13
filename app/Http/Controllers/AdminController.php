<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function UserProfile()
    {
        $userData = User::find(Auth::user()->id);

        return view('backend.admin.admin_profile', compact('userData'));
    }

    public function UserProfileStore(Request $request)
    {
        date_default_timezone_set('Asia/Jakarta');

        $data = User::find(Auth::user()->id);
        $data->name = $request->name;
        $data->email = $request->email;

        if ($request->file('profile_photo_path')) {
            $file = $request->file('profile_photo_path');
            unlink(public_path('upload/admin_images/' . $data->profile_photo_path));
            $filename = date('YmdHi') . $file->getClientOriginalName();
            $file->move(public_path('upload/admin_images'), $filename);

            $data->profile_photo_path = $filename;
        }

        $data->save();

        $notification = array(
            'message' => 'Update profile successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('user.profile')->with($notification);
    }

    public function ChangePassword()
    {
        return view('backend.admin.change_password');
    }

    public function UpdatePassword(Request $request)
    {
        $validateData = $request->validate([
            'old_password' => 'required',
            'password' => 'required|min:5|confirmed'
        ]);

        $hashedPassword = User::find(Auth::user()->id)->password;

        if (Hash::check($request->old_password, $hashedPassword)) {
            $user = User::find(Auth::user()->id);
            $user->password = Hash::make($request->password);
            $user->save();

            Auth::logout();

            return redirect()->route('admin.logout');
        } else {
            $notification = array(
                'message' => "Current password doesn't match ",
                'alert-type' => "error"
            );

            return redirect()->back()->with($notification);
        }
    }

    public function AdminLogout()
    {
        //default function
        Auth::logout();

        //return default route auth jetstream
        return redirect()->route('login');
    }
}
