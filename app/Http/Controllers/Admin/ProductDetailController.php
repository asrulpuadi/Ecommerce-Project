<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\ProductDetail;
use App\Models\ProductList;

class ProductDetailController extends Controller
{
    public function ProductDetail(Request $request)
    {
        $id = $request->id;

        $productDetail = ProductDetail::where('product_list_id', $id)->get();
        $productList = ProductList::where('id', $id)->first();

        $item = [
            'productDetail' => $productDetail,
            'productList' => $productList
        ];

        return response()->json([
            'item' => $item
        ]);
    }
}
