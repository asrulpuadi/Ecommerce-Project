<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Contact;

class ContactController extends Controller
{
    public function PostContact(Request $request)
    {
        date_default_timezone_set('Asia/Jakarta');

        $name = $request->input('name');
        $email = $request->input('email');
        $message = $request->input('message');

        $contact_time = date("h:i:sa");
        $contact_date = date("d-m-Y");

        $result =  Contact::create([
            'name' => $name,
            'email' => $email,
            'message' => $message,
            'contact_date' => $contact_date,
            'contact_time' => $contact_time
        ]);

        return $result;
    }

    public function AllContactMessage()
    {
        $message = Contact::orderBy('id', 'desc')->get();

        return view('backend.contact.contact_index', compact('message'));
    }

    public function DeleteContactMessage($id)
    {
        Contact::where('id', $id)->delete();

        $notification = array(
            'message' => 'Contact Message deleted successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }
}
