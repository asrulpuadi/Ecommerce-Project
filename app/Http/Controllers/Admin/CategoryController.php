<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image as Image;

class CategoryController extends Controller
{
    public function AllCategory()
    {
        $allCategory = Category::all();

        $categoryDetailsArr = [];

        foreach ($allCategory as $category) {
            $subCategory = SubCategory::where('category_name', $category->category_name)->get();

            $item = [
                'item_category_id' => $category->id,
                'item_category_name' => $category->category_name,
                'item_category_image' => $category->category_image,
                'item_sub_category_name' => $subCategory
            ];

            array_push($categoryDetailsArr, $item);
        }

        return $categoryDetailsArr;
    }

    public function AllCategoryDashboard()
    {
        $categories = Category::all();

        return view('backend.category.category_index', compact('categories'));
    }

    public function AddCategory()
    {
        return view('backend.category.category_add');
    }

    public function StoreCategory(Request $request)
    {
        $request->validate([
            'category_name' => 'required|min:3',
        ], [
            'category_name.required' => 'Please input category name',
            'category_name.min' => 'Category name must be more than 2 chars'
        ]);

        $image = $request->file('category_image');
        $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();

        Image::make($image)->resize(128, 128)->save('upload/category/' . $name_gen);

        $save_url = env('BASE_URL') . '/upload/category/' . $name_gen;

        Category::create([
            'category_name' => $request->category_name,
            'category_image' => $save_url
        ]);

        $notification = array(
            'message' => 'Category added successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.category')->with($notification);
    }

    public function EditCategory($id)
    {
        $category = Category::findOrFail($id);

        return view('backend.category.category_edit', compact('category'));
    }

    public function UpdateCategory(Request $request)
    {
        $request->validate([
            'category_name' => 'required|min:3',
        ], [
            'category_name.required' => 'Please input category name',
            'category_name.min' => 'Category name must be more than 2 chars'
        ]);

        $category_id = $request->id;

        if ($request->file('category_image')) {
            $image = $request->file('category_image');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();

            Image::make($image)->resize(128, 128)->save('upload/category/' . $name_gen);

            $save_url = env('BASE_URL') . '/upload/category/' . $name_gen;

            Category::where('id', $category_id)
                ->update([
                    'category_name' => $request->category_name,
                    'category_image' => $save_url
                ]);

            $notification = array(
                'message' => 'Category updated successfully',
                'alert-type' => 'success'
            );

            return redirect()->route('all.category')->with($notification);
        } else {
            Category::where('id', $category_id)
                ->update([
                    'category_name' => $request->category_name
                ]);

            $notification = array(
                'message' => 'Category updated successfully',
                'alert-type' => 'success'
            );

            return redirect()->route('all.category')->with($notification);
        }
    }

    public function DeleteCategory($id)
    {
        $get_category = Category::findOrFail($id);

        $file = str_replace(env('BASE_URL') . "/", "", $get_category->category_image);

        if (file_exists(public_path($file))) {
            Category::where('id', $id)->delete();

            unlink($file);

            $notification = array(
                'message' => 'Category deleted successfully',
                'alert-type' => 'success'
            );

            return redirect()->back()->with($notification);
        } else {
            Category::where('id', $id)->delete();

            $notification = array(
                'message' => 'Category deleted successfully',
                'alert-type' => 'success'
            );

            return redirect()->back()->with($notification);
        }
    }

    public function AllSubCategoryDashboard()
    {
        $subcategories = SubCategory::all();

        return view('backend.subcategory.subcategory_index', compact('subcategories'));
    }

    public function AddSubCategory()
    {
        $categories = Category::all();

        return view('backend.subcategory.subcategory_add', compact('categories'));
    }

    public function StoreSubCategory(Request $request)
    {
        $request->validate([
            'category_name' => 'required',
            'sub_category_name' => 'required|min:3'
        ], [
            'category_name.required' => 'Please input category name',
            'sub_category_name.required' => 'Please input Sub category name',
            'sub_category_name.min' => 'Sub Category name must be more than 2 chars'
        ]);

        SubCategory::create([
            'category_name' => $request->category_name,
            'sub_category_name' => $request->sub_category_name
        ]);

        $notification = array(
            'message' => 'Sub Category added successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.subcategory')->with($notification);
    }

    public function EditSubCategory($id)
    {
        $categories = Category::orderBy('category_name', 'asc')->get();
        $subcategory = SubCategory::findOrFail($id);

        return view('backend.subcategory.subcategory_edit', compact('categories', 'subcategory'));
    }

    public function UpdateSubCategory(Request $request)
    {
        $request->validate([
            'category_name' => 'required',
            'sub_category_name' => 'required|min:3'
        ], [
            'category_name.required' => 'Please input category name',
            'sub_category_name.required' => 'Please input Sub category name',
            'sub_category_name.min' => 'Sub Category name must be more than 2 chars'
        ]);

        $subcategory_id = $request->id;

        SubCategory::where('id', $subcategory_id)
            ->update([
                'category_name' => $request->category_name,
                'sub_category_name' => $request->sub_category_name
            ]);

        $notification = array(
            'message' => 'Sub Category updated successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.subcategory')->with($notification);
    }

    public function DeleteSubCategory($id)
    {
        SubCategory::where('id', $id)->delete();

        $notification = array(
            'message' => 'Sub Category deleted successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }
}
