<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    //
    public function index(): Response
    {
        $category = Category::with("type")->get();
        $type = Type::all();
        return Inertia::render("Admin/Category/Category", compact("category", "type"));
    }
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|max:255|unique:categories,name",
            "type_id" =>"required|numeric"
        ]);
        Category::create([
            "name" => $request->input("name"),
            "type_id" => $request->input("type_id")
        ]);
        $request->session()->flash("message", "Berhasil menambahkan kategori baru");
        return redirect()->to(route("category"));
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            "name" => "required",
            "type_id" => "required",
        ]);
        $category = Category::findOrFail($id);
        if ($request->input("name") != $category->name) {
            $request->validate([
                "name" => "unique:categories,name"
            ]);
        }
        $category->name = $request->input("name");
        $category->type_id = $request->input("type_id");
        $category->save();
        return redirect()->to(route("category"));
    }
    public function delete(Request $request)
    {
        Category::findOrFail($request->input("id"))->delete();
        $request->session()->flash("message", "Berhasil menghapus kategori");
        return redirect()->to(route("category"));
    }
    public function indexApi() {
        $data = Type::with("category")->get();
        return response()->json(compact("data"))->setStatusCode(200);
    }
}
