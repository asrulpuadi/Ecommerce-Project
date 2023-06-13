<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\ProductReview;

class ProductReviewController extends Controller
{
    public function ReviewList(Request $request)
    {
        $product_code = $request->product_code;

        $result = ProductReview::where('product_code', $product_code)->orderBy('id', 'desc')->limit(5)->get();

        return response()->json($result, 200);
    }

    public function PostReview(Request $request)
    {
        $product_code = $request->product_code;
        $product_name = $request->product_name;
        $reviewer_name = $request->reviewer_name;
        $reviewer_photo = $request->reviewer_photo;
        $reviewer_rating = $request->reviewer_rating;
        $reviewer_comment = $request->reviewer_comment;

        $result = ProductReview::create([
            'product_code' => $product_code,
            'product_name' => $product_name,
            'reviewer_name' => $reviewer_name,
            'reviewer_photo' => $reviewer_photo,
            'reviewer_rating' => $reviewer_rating,
            'reviewer_comment' => $reviewer_comment
        ]);

        return $result;
    }

    public function AllReview()
    {
        $review = ProductReview::orderBy('id', 'desc')->get();

        return view('backend.review.review_index', compact('review'));
    }
}
