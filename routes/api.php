<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/products", [ProductController::class, "indexApi"])->name("api.products");
Route::get("/category", [CategoryController::class, "indexApi"])->name("api.category");

Route::get("/dashboard/admin/monthly", [DashboardController::class, "monthly"])->name("dashboard.admin.monthly");
Route::get("/dashboard/admin/monthlychart", [DashboardController::class, "monthlyChart"])->name("dashboard.admin.monthlychart");
Route::get("/dashboard/admin/product_terlaris", [DashboardController::class, "productTerlaris"])->name("dashboard.admin.productTerlaris");
