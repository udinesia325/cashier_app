<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public $page = 1;
    public $perPage = 10;
    public $search = '';
    public function index(Request $request): Response
    {
        $page = $request->input("page") ?? $this->page;
        $search = $request->input("search") ?? $this->search;
        $products = Product::query()->where(function (Builder $builder) use ($search) {
            $builder->where('name', 'like', "%$search%");
            $builder->orWhere('price', 'like', "%$search%");
        });
        $data = new ProductCollection($products->paginate(perPage:$this->perPage, page: $page));
        return Inertia::render("Admin/Products/Products", compact("data"));
    }
}
