<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image as Image;

use App\Models\Category;
use App\Models\ProductDetail;
use App\Models\ProductList;
use App\Models\SubCategory;

class ProductListController extends Controller
{
    public function ProductListByRemark(Request $request)
    {
        $remark = $request->remark;

        $productList = ProductList::where('remark', $remark)
            ->orderBy('id', 'desc')
            ->limit(5)
            ->get();

        return $productList;
    }

    public function ProductListByCategory(Request $request)
    {
        $category = $request->category;
        $productList = ProductList::where('category', $category)->get();

        return $productList;
    }

    public function ProductListBySubCategory(Request $request)
    {
        $category = $request->category;
        $subCategory = $request->subcategory;

        $productList = ProductList::where('category', $category)
            ->where('subcategory', $subCategory)
            ->get();

        return $productList;
    }

    public function ProductSearch(Request $request)
    {
        $key = $request->key;

        $product = ProductList::where('title', 'like', '%' . $key . '%')
            ->orWhere('brand', 'like', '%' . $key . '%')
            ->get();

        return $product;
    }

    public function SuggestedProduct(Request $request)
    {
        $subcategory = $request->subcategory;

        $productList = ProductList::where('subcategory', $subcategory)
            ->orderBy('id', 'desc')
            ->limit(6)
            ->get();

        return response()->json($productList);
    }


    /* 
       >>>>>>> function handle product by admin dashboard <<<<<<<<
    */

    public function AllProduct()
    {
        $products = ProductList::orderBy('id', 'desc')->paginate(10);

        return view('backend.product.product_index', compact('products'));
    }

    public function AddProduct()
    {
        $category = Category::orderBy('category_name', 'asc')->get();
        $subcategory = SubCategory::orderBy('sub_category_name', 'asc')->get();

        return view('backend.product.product_add', compact('category', 'subcategory'));
    }

    public function StoreProduct(Request $request)
    {
        date_default_timezone_set('Asia/Jakarta');

        $image_thumbnail = $request->file('image');
        $name_gen_thumbnail = hexdec(uniqid()) . '.' . $image_thumbnail->getClientOriginalExtension();
        Image::make($image_thumbnail)->resize(900, 660)->save('upload/product/' . $name_gen_thumbnail);
        $save_url_thumbnail = env('BASE_URL') . '/upload/product/' . $name_gen_thumbnail;

        $image_one = $request->file('image_one');
        $name_image_one = hexdec(uniqid()) . '.' . $image_one->getClientOriginalExtension();
        Image::make($image_one)->resize(900, 660)->save('upload/productdetail/' . $name_image_one);
        $save_url_image_one = env('BASE_URL') . '/upload/productdetail/' . $name_image_one;

        $image_two = $request->file('image_two');
        $name_image_two = hexdec(uniqid()) . '.' . $image_two->getClientOriginalExtension();
        Image::make($image_two)->resize(900, 660)->save('upload/productdetail/' . $name_image_two);
        $save_url_image_two = env('BASE_URL') . '/upload/productdetail/' . $name_image_two;

        $image_three = $request->file('image_three');
        $name_image_three = hexdec(uniqid()) . '.' . $image_three->getClientOriginalExtension();
        Image::make($image_three)->resize(900, 660)->save('upload/productdetail/' . $name_image_three);
        $save_url_image_three = env('BASE_URL') . '/upload/productdetail/' . $name_image_three;

        $image_four = $request->file('image_four');
        $name_image_four = hexdec(uniqid()) . '.' . $image_four->getClientOriginalExtension();
        Image::make($image_four)->resize(900, 660)->save('upload/productdetail/' . $name_image_four);
        $save_url_image_four = env('BASE_URL') . '/upload/productdetail/' . $name_image_four;

        $product_id = ProductList::insertGetId([
            'title' => $request->title,
            'price' => $request->price,
            'special_price' => $request->special_price,
            'image' => $save_url_thumbnail,
            'category' => $request->category,
            'subcategory' => $request->subcategory,
            'remark' => $request->remark,
            'brand' => $request->brand,
            'product_code' => $request->product_code,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);


        ProductDetail::create([
            'product_list_id' => $product_id,
            'image_one' => $save_url_image_one,
            'image_two' => $save_url_image_two,
            'image_three' => $save_url_image_three,
            'image_four' => $save_url_image_four,
            'short_description' => $request->short_description,
            'color' => $request->color,
            'size' => $request->size,
            'long_description' => $request->long_description
        ]);

        $notification = array(
            'message' => 'Product new added successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.product')->with($notification);
    }

    public function Editroduct($id)
    {
        $category = Category::orderBy('category_name', 'asc')->get();
        $subcategory = SubCategory::orderBy('sub_category_name', 'asc')->get();
        $product = ProductList::findOrFail($id);
        $detail = ProductDetail::where('product_list_id', $id)->first();

        return view('backend.product.product_edit', compact('category', 'subcategory', 'product', 'detail'));
    }

    public function UpdateProduct(Request $request)
    {
        $product_id = $request->id;

        if ($request->file('image') || $request->file('image_one') || $request->file('image_two') || $request->file('image_three') || $request->file('image_four')) {

            $image_thumbnail = $request->file('image');
            $name_gen_thumbnail = hexdec(uniqid()) . '.' . $image_thumbnail->getClientOriginalExtension();
            Image::make($image_thumbnail)->resize(900, 660)->save('upload/product/' . $name_gen_thumbnail);
            $save_url_thumbnail = env('BASE_URL') . '/upload/product/' . $name_gen_thumbnail;

            $image_one = $request->file('image_one');
            $name_image_one = hexdec(uniqid()) . '.' . $image_one->getClientOriginalExtension();
            Image::make($image_one)->resize(900, 660)->save('upload/productdetail/' . $name_image_one);
            $save_url_image_one = env('BASE_URL') . '/upload/productdetail/' . $name_image_one;

            $image_two = $request->file('image_two');
            $name_image_two = hexdec(uniqid()) . '.' . $image_two->getClientOriginalExtension();
            Image::make($image_two)->resize(900, 660)->save('upload/productdetail/' . $name_image_two);
            $save_url_image_two = env('BASE_URL') . '/upload/productdetail/' . $name_image_two;

            $image_three = $request->file('image_three');
            $name_image_three = hexdec(uniqid()) . '.' . $image_three->getClientOriginalExtension();
            Image::make($image_three)->resize(900, 660)->save('upload/productdetail/' . $name_image_three);
            $save_url_image_three = env('BASE_URL') . '/upload/productdetail/' . $name_image_three;

            $image_four = $request->file('image_four');
            $name_image_four = hexdec(uniqid()) . '.' . $image_four->getClientOriginalExtension();
            Image::make($image_four)->resize(900, 660)->save('upload/productdetail/' . $name_image_four);
            $save_url_image_four = env('BASE_URL') . '/upload/productdetail/' . $name_image_four;

            ProductList::where('id', $product_id)->update([
                'title' => $request->title,
                'price' => $request->price,
                'special_price' => $request->special_price,
                'image' => $save_url_thumbnail,
                'category' => $request->category,
                'subcategory' => $request->subcategory,
                'remark' => $request->remark,
                'brand' => $request->brand,
                'product_code' => $request->product_code,
            ]);

            ProductDetail::where('product_list_id', $product_id)->update([
                'image_one' => $save_url_image_one,
                'image_two' => $save_url_image_two,
                'image_three' => $save_url_image_three,
                'image_four' => $save_url_image_four,
                'short_description' => $request->short_description,
                'color' => $request->color,
                'size' => $request->size,
                'long_description' => $request->long_description
            ]);

            $notification = array(
                'message' => 'Update product successfully',
                'alert-type' => 'success'
            );

            return redirect()->route('all.product')->with($notification);
        } else {

            ProductList::where('id', $product_id)->update([
                'title' => $request->title,
                'price' => $request->price,
                'special_price' => $request->special_price,
                'category' => $request->category,
                'subcategory' => $request->subcategory,
                'remark' => $request->remark,
                'brand' => $request->brand,
                'product_code' => $request->product_code,
            ]);

            ProductDetail::where('product_list_id', $product_id)->update([
                'short_description' => $request->short_description,
                'color' => $request->color,
                'size' => $request->size,
                'long_description' => $request->long_description
            ]);

            $notification = array(
                'message' => 'Update product successfully',
                'alert-type' => 'success'
            );

            return redirect()->route('all.product')->with($notification);
        }
    }
}
