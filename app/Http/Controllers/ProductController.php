<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Type;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public $page = 1;
    public $perPage = 10;
    public $search = '';
    public function index(Request $request): Response
    {
        $page = $request->input("page") ?? $this->page;
        $search = $request->input("search") ?? $this->search;
        $products = Product::query()->with(["category","type"])->where(function (Builder $builder) use ($search) {
            $builder->where('name', 'like', "%$search%");
            $builder->orWhere('price', 'like', "%$search%");
        });
        $data = new ProductCollection($products->paginate(perPage: $this->perPage, page: $page));
        return Inertia::render("Admin/Products/Products", compact("data"));
    }
    public function add()
    {
        $type = Type::all();
        $category = Category::all();
        return Inertia::render("Admin/Products/Add", compact("type", "category"));
    }
    public function store(StoreProductRequest $request)
    {
        $file = $request->file("image");
        $name = $request->input("name");
        $price = $request->input("price");
        $type_id = $request->input("type_id");
        $category_id = $request->input("category_id");

        $filename = explode(".", $file->getClientOriginalName())[0] . "-" . Str::random(10) . "." . $file->getClientOriginalExtension();
        $path = "images/products/";
        try{
            Product::create([
                "name" => $name,
                "price" => $price,
                "image" => $path.$filename,
                "type_id" => $type_id,
                "category_id" => $category_id
            ]);
            $file->move($path,$filename);
            $request->session()->flash("message","Berhasil menambahan produk");
            return redirect()->to(route("products"));
        }catch(Exception $e){
            dd($e);
        }
    }
}
