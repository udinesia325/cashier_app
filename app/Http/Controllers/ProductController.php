<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductCollection;
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
        $products = Product::query()->with(["category", "type"])->where(function (Builder $builder) use ($search) {
            $builder->where('name', 'like', "%$search%");
            $builder->orWhere('price', 'like', "%$search%");
        })->latest();
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
        try {
            Product::create([
                "name" => $name,
                "price" => $price,
                "image" => $path . $filename,
                "type_id" => $type_id,
                "category_id" => $category_id
            ]);
            $file->move($path, $filename);
            $request->session()->flash("message", "Berhasil menambahan produk");
            return redirect()->to(route("products"));
        } catch (Exception $e) {
            abort(500);
        }
    }
    public function delete(Request $request)
    {
        $id = $request->input("id");
        $product = Product::find($id);
        // hapus image selain default
        if (explode("/", $product->image)[2] != "default.png") {
            unlink(public_path($product->image));
        }
        $product->delete();
        return response()->json([
            "status" => true
        ])->setStatusCode(200);
    }
    public function edit($id): Response
    {
        if (!$id) return redirect(route("products"));
        $data =  Product::find($id);
        if (!$data) abort(404);
        $type = Type::all();
        $category = Category::all();
        return Inertia::render("Admin/Products/Edit", compact("data", "type", "category"));
    }
    public function update(UpdateProductRequest $request)
    {
        $id = $request->input("id");
        $name = $request->input("name");
        $price = $request->input("price");
        $category_id = $request->input("category_id");
        $type_id = $request->input("type_id");
        $image = $request->file("image");

        $product = Product::find($id);
        $oldImage = $product->image;
        if (!$product) abort(404);

        // jika nama produk di ubah maka beri validasi unik agar tidak sama dengan product lain
        if ($name != $product->name) {
            $request->validate([
                "name" => "unique:products,name"
            ]);
        }
        $product->name = $name;
        $product->price = $price;
        $product->category_id = $category_id;
        $product->type_id = $type_id;
        if ($image) {
            // jika ada gambar maka perbarui di database dan hapus di public 
            $filename = explode(".", $image->getClientOriginalName())[0] . "-" . Str::random(10) . "." . $image->getClientOriginalExtension();
            $path = "images/products/";
            $product->image = $path . $filename;
        }
        $product->save();

        if ($image) {
            // upload ke public
            $image->move($path, $filename);
            // hapus gambar lama tetapi janga untuk gambar default
            if (explode("/", $oldImage)[2] != "default.png") {
                unlink(public_path($oldImage));
            }
        }


        $request->session()->flash("message", "Berhasil memperparui produk");
        return redirect()->to(route("products"));
    }
}
