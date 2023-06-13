<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Favourite;
use App\Models\ProductList;

class FavouriteController extends Controller
{
    public function AddFavourite(Request $request)
    {
        $product_code = $request->product_code;
        $email = $request->email;

        $productChoose = ProductList::where('product_code', $product_code)->get();

        $result = Favourite::create([
            'product_name' => $productChoose[0]['title'],
            'image' => $productChoose[0]['image'],
            'product_code' => $product_code,
            'email' => $email,
        ]);

        return response()->json($result, 200);
    }

    public function FavouriteList(Request $request)
    {
        $email = $request->email;

        $result = Favourite::where('email', $email)->get();

        return $result;
    }

    public function FavouriteRemove(Request $request)
    {
        $id = $request->id;
        $email = $request->email;

        $result = Favourite::where('id', $id)
            ->where('email', $email)
            ->delete();

        return $result;
    }
}
