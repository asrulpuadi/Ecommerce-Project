<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\CartOrder;
use App\Models\ProductCart;
use App\Models\ProductList;
use Illuminate\Support\Facades\Auth;

class ProductCartController extends Controller
{
    public function AddToCart(Request $request)
    {
        $email = $request->input('email');
        $size = $request->input('size');
        $color = $request->input('color');
        $quantity = $request->input('quantity');
        $product_code = $request->input('product_code');

        $productChoose = ProductList::where('product_code', $product_code)->first();

        $price = $productChoose->price;
        $special_price = $productChoose->special_price;

        if ($special_price == "N/A") {
            $total_price = $price * $quantity;
            $unit_price = $price;
        } else {
            $total_price = $special_price * $quantity;
            $unit_price = $special_price;
        }

        $result = ProductCart::create([
            'user_email' => $email,
            'product_code' => $product_code,
            'product_name' => $productChoose->title,
            'image' => $productChoose->image,
            'size' => $size,
            'color' => $color,
            'quantity' => $quantity,
            'unit_price' => $unit_price,
            'total_price' => $total_price,
        ]);

        return response()->json($result, 200);
    }

    public function CartCount()
    {
        $email = Auth::user()->email;

        $result = ProductCart::where('user_email', $email)->count();

        return response()->json($result, 200);
    }

    public function CartList(Request $request)
    {
        $email = $request->email;

        $result = ProductCart::where('user_email', $email)->get();

        return response()->json($result, 200);
    }

    public function RemoveCartList(Request $request)
    {
        $id = $request->id;

        $result = ProductCart::where('id', $id)->delete();

        return $result;
    }

    public function CartItemPlus(Request $request)
    {
        $id = $request->id;
        $quantity = $request->quantity;
        $price = $request->price;

        $newQuantity = $quantity + 1;

        $total_price = $newQuantity * $price;

        $result = ProductCart::where('id', $id)->update([
            'quantity' => $newQuantity,
            'total_price' => $total_price
        ]);

        return response()->json($result, 200);
    }

    public function CartItemMinus(Request $request)
    {
        $id = $request->id;
        $quantity = $request->quantity;
        $price = $request->price;

        $newQuantity = $quantity - 1;

        $total_price = $newQuantity * $price;

        $result = ProductCart::where('id', $id)->update([
            'quantity' => $newQuantity,
            'total_price' => $total_price
        ]);

        return response()->json($result, 200);
    }

    public function CartOrder(Request $request)
    {
        $city = $request->input('city');
        $payment_method = $request->input('payment_method');
        $name = $request->input('name');
        $email = $request->input('email');
        $delivery_address = $request->input('delivery_address');
        $invoice_number = $request->input('invoice_number');
        $delivery_charge = $request->input('delivery_charge');

        date_default_timezone_set('Asia/Jakarta');

        $time = date("h:i:sa");
        $date = date("d-m-Y");

        $cartList = ProductCart::where('user_email', $email)->get();

        foreach ($cartList as $cart) {
            $cartInsertDeleteResult = "";

            $resultInsert = CartOrder::create([
                'invoice_number' => "INV" . $invoice_number,
                'product_name' => $cart->product_name,
                'product_code' => $cart->product_code,
                'size' => $cart->size,
                'color' => $cart->color,
                'quantity' => $cart->quantity,
                'unit_price' => $cart->unit_price,
                'total_price' => $cart->total_price,
                'email' => $cart->user_email,
                'name' => $name,
                'payment_method' => $payment_method,
                'delivery_address' => $delivery_address,
                'city' => $city,
                'delivery_charge' => $delivery_charge,
                'order_date' => $date,
                'order_time' => $time,
                'order_status' => "Pending"
            ]);

            if ($resultInsert) {
                $resultDelete = ProductCart::where('id', $cart->id)->delete();

                if ($resultDelete) {
                    $cartInsertDeleteResult = 1;
                } else {
                    $cartInsertDeleteResult = 0;
                }
            }
        }

        return $cartInsertDeleteResult;
    }

    public function OrderList(Request $request)
    {
        $email = $request->email;

        $result = CartOrder::where('email', $email)->orderBy('id', 'desc')->get();

        return $result;
    }


    /* 
        >>>> Administrator Manage product order user <<<<<
    */

    public function PendingOrder()
    {
        $order = CartOrder::where('order_status', 'Pending')->orderBy('id', 'desc')->get();

        return view('backend.order.pending_order_index', compact('order'));
    }

    public function ProcessingOrder()
    {
        $order = CartOrder::where('order_status', 'Processing')->orderBy('id', 'desc')->get();

        return view('backend.order.processing_order', compact('order'));
    }

    public function CompleteOrder()
    {
        $order = CartOrder::where('order_status', 'Complete')->orderBy('id', 'desc')->get();

        return view('backend.order.complete_order', compact('order'));
    }

    public function OrderDetail($id)
    {
        $detail = CartOrder::where('id', $id)->first();

        return view('backend.order.detail', compact('detail'));
    }

    public function ProcessingConfirm($id)
    {
        CartOrder::where('id', $id)->update([
            'order_status' => 'Processing'
        ]);

        $notification = array(
            'message' => 'Processing Order Confirmation successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('pending.order')->with($notification);
    }

    public function CompleteConfirm($id)
    {
        CartOrder::where('id', $id)->update([
            'order_status' => 'Complete'
        ]);

        $notification = array(
            'message' => 'Complete Order Confirmation successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('processing.order')->with($notification);
    }
}
