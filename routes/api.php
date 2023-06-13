<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\FavouriteController;
use App\Http\Controllers\Admin\HomeSliderController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\ProductDetailController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\ProductReviewController;
use App\Http\Controllers\Admin\SiteInfoController;
use App\Http\Controllers\Admin\VisitorController;


use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ForgetPasswordController;
use App\Http\Controllers\User\ResetPasswordController;
use App\Http\Controllers\User\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//get visitor
Route::get('/get-visitor', [VisitorController::class, 'GetVisitorDetails']);

//contact page route
Route::post('/post-contact', [ContactController::class, 'PostContact']);

//site info route
Route::get('/allsiteinfo', [SiteInfoController::class, 'AllSiteInfo']);

// all category
Route::get('/allcategory', [CategoryController::class, 'AllCategory']);

// 
// -- product list route
//
Route::get('/product-list-by-remark/{remark}', [ProductListController::class, 'ProductListByRemark']);

Route::get('/product-list-by-category/{category}', [ProductListController::class, 'ProductListByCategory']);

Route::get('/product-list-by-subcategory/{category}/{subcategory}', [ProductListController::class, 'ProductListBySubCategory']);

// 
// -- slider route
//
Route::get('/homeslider', [HomeSliderController::class, 'HomeSlider']);

// 
// -- product detail route
//
Route::get('/product-detail/{id}', [ProductDetailController::class, 'ProductDetail']);

// 
// -- notification route
//
Route::get('/notification', [NotificationController::class, 'NotificationHistory']);


// 
// -- search route
//
Route::get('/search/{key}', [ProductListController::class, 'ProductSearch']);

// related product
Route::get('/sugegestedproduct/{subcategory}', [ProductListController::class, 'SuggestedProduct']);

// review product
Route::get('/reviewlist/{product_code}', [ProductReviewController::class, 'ReviewList']);

//post product review
Route::post('/postreview', [ProductReviewController::class, 'PostReview']);

// product cart
Route::post('/addtocart', [ProductCartController::class, 'AddToCart']);
Route::get('/cartcount', [ProductCartController::class, 'CartCount'])->middleware('auth:api');
Route::get('/cartlist/{email}', [ProductCartController::class, 'CartList']);
Route::get('/removecartlist/{id}', [ProductCartController::class, 'RemoveCartList']);
Route::get('/cartitemplus/{id}/{quantity}/{price}', [ProductCartController::class, 'CartItemPlus']);
Route::get('/cartitemminus/{id}/{quantity}/{price}', [ProductCartController::class, 'CartItemMinus']);
Route::post('/cartorder', [ProductCartController::class, 'CartOrder']);
Route::get('/orderlist/{email}', [ProductCartController::class, 'OrderList']);


// favourite
Route::get('/favourite/{product_code}/{email}', [FavouriteController::class, 'AddFavourite']);
Route::get('/favouritelist/{email}', [FavouriteController::class, 'FavouriteList']);
Route::get('/favouriteremove/{id}/{email}', [FavouriteController::class, 'FavouriteRemove']);



//
//-- USER AUTH API 
//


Route::post('/login', [AuthController::class, 'Login']);
Route::post('/register', [AuthController::class, 'Register']);
Route::post('/forgetpassword', [ForgetPasswordController::class, 'ForgetPassword']);
Route::post('/resetpassword', [ResetPasswordController::class, 'ResetPassword']);

Route::get('/user', [UserController::class, 'GetUserInfo'])->middleware('auth:api');

Route::post('/logout', [AuthController::class, 'LogOut'])->middleware('auth:api');

//
//-- END USER AUTH API 
//