<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image as Image;

use App\Models\HomeSlider;

class HomeSliderController extends Controller
{
    public function HomeSlider()
    {
        $allSlider = HomeSlider::all();

        return $allSlider;
    }

    public function AllSlider()
    {
        $sliders = HomeSlider::all();

        return view('backend.slider.slider_index', compact('sliders'));
    }

    public function AddSlider()
    {
        return view('backend.slider.slider_add');
    }

    public function StoreSlider(Request $request)
    {
        $request->validate([
            'slider_image' => 'required',
        ], [
            'slider_image.required' => 'Please upload slider image'
        ]);

        $image = $request->file('slider_image');
        $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();

        Image::make($image)->resize(1024, 600)->save('upload/slider/' . $name_gen);

        $save_url = env('BASE_URL') . '/upload/slider/' . $name_gen;

        HomeSlider::create([
            'slider_image' => $save_url
        ]);

        $notification = array(
            'message' => 'Slider Image added successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.slider')->with($notification);
    }

    public function EditSlider($id)
    {
        $slider = HomeSlider::findOrFail($id);

        return view('backend.slider.slider_edit', compact('slider'));
    }

    public function UpdateSlider(Request $request)
    {
        $request->validate([
            'slider_image' => 'required',
        ], [
            'slider_image.required' => 'Please upload slider image'
        ]);

        $slider_id = $request->id;

        if ($request->file('slider_image')) {
            $image = $request->file('slider_image');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();

            Image::make($image)->resize(1024, 600)->save('upload/slider/' . $name_gen);

            $save_url = env('BASE_URL') . '/upload/slider/' . $name_gen;

            HomeSlider::where('id', $slider_id)
                ->update([
                    'slider_image' => $save_url
                ]);

            $notification = array(
                'message' => 'Slider updated successfully',
                'alert-type' => 'success'
            );

            return redirect()->route('all.slider')->with($notification);
        } else {

            $notification = array(
                'message' => 'Slider updated successfully',
                'alert-type' => 'success'
            );

            return redirect()->route('all.slider')->with($notification);
        }
    }

    public function DeleteSlider($id)
    {
        $get_slider = HomeSlider::findOrFail($id);

        $file = str_replace(env('BASE_URL') . "/", "", $get_slider->slider_image);

        if (file_exists(public_path($file))) {
            HomeSlider::where('id', $id)->delete();

            unlink($file);

            $notification = array(
                'message' => 'Slider deleted successfully',
                'alert-type' => 'success'
            );

            return redirect()->back()->with($notification);
        } else {
            HomeSlider::where('id', $id)->delete();

            $notification = array(
                'message' => 'Slider deleted successfully',
                'alert-type' => 'success'
            );

            return redirect()->back()->with($notification);
        }
    }
}
