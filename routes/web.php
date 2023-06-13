<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\HomeSliderController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\ProductReviewController;
use App\Http\Controllers\Admin\SiteInfoController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return view('auth.login');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/dashboard', function () {
        return view('admin.index');
    })->name('dashboard');
});

//admin logout
Route::get('/adminlogout', [AdminController::class, 'AdminLogout'])->name('admin.logout');

Route::prefix('admin')->group(function () {
    Route::get('/user/profile', [AdminController::class, 'UserProfile'])->name('user.profile');

    Route::post('/user/profile/store', [AdminController::class, 'UserProfileStore'])->name('user.profile.store');

    Route::get('/change/password', [AdminController::class, 'ChangePassword'])->name('change.password');

    Route::post('/change/password/update', [AdminController::class, 'UpdatePassword'])->name('change.password.update');
});

Route::prefix('category')->group(function () {
    Route::get('/all', [CategoryController::class, 'AllCategoryDashboard'])->name('all.category')->middleware('auth');

    Route::get('/add', [CategoryController::class, 'AddCategory'])->name('add.category')->middleware('auth');

    Route::post('/store', [CategoryController::class, 'StoreCategory'])->name('category.store')->middleware('auth');
    Route::get('/edit/{id}', [CategoryController::class, 'EditCategory'])->name('category.edit')->middleware('auth');
    Route::post('/update', [CategoryController::class, 'UpdateCategory'])->name('category.update')->middleware('auth');
    Route::get('/delete/{id}', [CategoryController::class, 'DeleteCategory'])->name('category.delete')->middleware('auth');
});

Route::prefix('subcategory')->group(function () {
    Route::get('/all', [CategoryController::class, 'AllSubCategoryDashboard'])->name('all.subcategory')->middleware('auth');
    Route::get('/add', [CategoryController::class, 'AddSubCategory'])->name('add.subcategory')->middleware('auth');
    Route::post('/store', [CategoryController::class, 'StoreSubCategory'])->name('subcategory.store')->middleware('auth');
    Route::get('/edit/{id}', [CategoryController::class, 'EditSubCategory'])->name('subcategory.edit')->middleware('auth');
    Route::post('/update', [CategoryController::class, 'UpdateSubCategory'])->name('subcategory.update')->middleware('auth');
    Route::get('/delete/{id}', [CategoryController::class, 'DeleteSubCategory'])->name('subcategory.delete')->middleware('auth');
});

Route::prefix('slider')->group(function () {
    Route::get('/all', [HomeSliderController::class, 'AllSlider'])->name('all.slider')->middleware('auth');
    Route::get('/add', [HomeSliderController::class, 'AddSlider'])->name('add.slider')->middleware('auth');
    Route::post('/store', [HomeSliderController::class, 'StoreSlider'])->name('slider.store')->middleware('auth');
    Route::get('/edit/{id}', [HomeSliderController::class, 'EditSlider'])->name('slider.edit')->middleware('auth');
    Route::post('/update', [HomeSliderController::class, 'UpdateSlider'])->name('slider.update')->middleware('auth');
    Route::get('/delete/{id}', [HomeSliderController::class, 'DeleteSlider'])->name('slider.delete')->middleware('auth');
});

Route::prefix('product')->group(function () {
    Route::get('/all', [ProductListController::class, 'AllProduct'])->name('all.product')->middleware('auth');
    Route::get('/add', [ProductListController::class, 'AddProduct'])->name('add.product')->middleware('auth');
    Route::post('/store', [ProductListController::class, 'StoreProduct'])->name('product.store')->middleware('auth');
    Route::get('/edit/{id}', [ProductListController::class, 'Editroduct'])->name('product.edit')->middleware('auth');
    Route::post('/update', [ProductListController::class, 'UpdateProduct'])->name('product.update')->middleware('auth');
});


Route::get('/allcontact/message', [ContactController::class, 'AllContactMessage'])->name('contact.message')->middleware('auth');
Route::get('/contact/message/delete/{id}', [ContactController::class, 'DeleteContactMessage'])->name('contact.message.delete')->middleware('auth');

Route::get('/all/review', [ProductReviewController::class, 'AllReview'])->name('all.review')->middleware('auth');

Route::get('/siteinfo', [SiteInfoController::class, 'SiteInfo'])->name('site.info')->middleware('auth');
Route::post('/siteinfo/update', [SiteInfoController::class, 'SiteUpdate'])->name('siteinfo.update')->middleware('auth');


Route::prefix('order')->group(function () {
    Route::get('/pending', [ProductCartController::class, 'PendingOrder'])->name('pending.order')->middleware('auth');
    Route::get('/processing', [ProductCartController::class, 'ProcessingOrder'])->name('processing.order')->middleware('auth');
    Route::get('/complete', [ProductCartController::class, 'CompleteOrder'])->name('complete.order')->middleware('auth');
    Route::get('/detail/{id}', [ProductCartController::class, 'OrderDetail'])->name('order.detail')->middleware('auth');
    Route::get('/processing/confirm/{id}', [ProductCartController::class, 'ProcessingConfirm'])->name('processing.confirm')->middleware('auth');
    Route::get('/complete/confirm/{id}', [ProductCartController::class, 'CompleteConfirm'])->name('complete.confirm')->middleware('auth');
});
