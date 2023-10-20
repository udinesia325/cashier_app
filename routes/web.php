<?php

use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\BookepingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TypeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboard', [DashboardController::class, "index"])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix("admin")->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get("/user", [UserController::class, "index"])->name("admin.user");
    Route::get("/add", [UserController::class, "add"])->name("admin.user.add");

    // 
    Route::middleware("role:admin")->group(function () {
        // product routes
        Route::get("/products", [ProductController::class, "index"])->name("products");
        Route::get("/products/add", [ProductController::class, "add"])->name("products.add");
        Route::post("/products/store", [ProductController::class, "store"])->name("products.store");
        Route::get("/products/edit/{id}", [ProductController::class, "edit"])->name("products.edit");
        Route::post("/products/update", [ProductController::class, "update"])->name("products.update");

        // api response
        Route::post("/products/delete", [ProductController::class, "delete"])->name("products.delete");

        // category routes
        Route::get("/category", [CategoryController::class, "index"])->name("category");
        Route::post("/category/store", [CategoryController::class, "store"])->name("category.store");
        Route::delete("/category/delete", [CategoryController::class, "delete"])->name("category.delete");
        Route::post("/category/update/{id}", [CategoryController::class, "update"])
            ->name("category.update")->where('id', '[0-9]+');

        // type routes
        Route::post("/type/store", [TypeController::class, "store"])->name("type.store");
        Route::delete("/type/delete", [TypeController::class, "delete"])->name("type.delete");
        Route::post("/type/update/{id}", [TypeController::class, "update"])
            ->name("type.update")->where('id', '[0-9]+');

        // bookeping
        Route::get("/bookeping", [BookepingController::class, "index"])->name("bookeping");
    });
});
Route::middleware('auth')->group(function () {
    Route::middleware("role:staff")->group(function () {
        // transaction controller
        Route::post("/transaction", [TransactionController::class, "store"])->name("transaction.store");
    });
});


require __DIR__ . '/auth.php';
