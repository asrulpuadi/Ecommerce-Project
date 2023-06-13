<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SiteInfo;

class SiteInfoController extends Controller
{
    public function AllSiteInfo()
    {
        $result = SiteInfo::all();

        return $result;
    }

    public function SiteInfo()
    {
        $siteinfo = SiteInfo::first();

        return view('backend.siteinfo.siteinfo_index', compact('siteinfo'));
    }

    public function SiteUpdate(Request $request)
    {
        $siteinfo_id = $request->id;

        SiteInfo::where('id', $siteinfo_id)->update([
            'about' => $request->about,
            'refund' => $request->refund,
            'purchase_guide' => $request->purchase_guide,
            'privacy' => $request->privacy,
            'address' => $request->address,
            'android_app_link' => $request->android_app_link,
            'ios_app_link' => $request->ios_app_link,
            'facebook_link' => $request->facebook_link,
            'twitter_link' => $request->twitter_link,
            'instagaram_link' => $request->instagaram_link,
            'copyright_text' => $request->copyright_text
        ]);

        $notification = array(
            'message' => 'Site Info Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }
}
