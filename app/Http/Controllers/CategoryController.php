<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    //
    public function index(): Response
    {
        $category = Category::all();
        $type = Type::all();
        return Inertia::render("Admin/Category/Category", compact("category", "type"));
    }
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|max:255|unique:categories,name"
        ]);
        Category::create([
            "name" => $request->input("name")
        ]);
        $request->session()->flash("message", "Berhasil menambahkan kategori baru");
        return redirect()->to(route("category"));
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            "name" => "required"
        ]);
        $category = Category::findOrFail($id);
        if ($request->input("name") != $category->name) {
            $request->validate([
                "name" => "unique:categories,name"
            ]);
        }
        $category->name = $request->input("name");
        $category->save();
        return redirect()->to(route("category"));
    }
    function delete(Request $request)
    {
        Category::findOrFail($request->input("id"))->delete();
        $request->session()->flash("message", "Berhasil menghapus kategori");
        return redirect()->to(route("category"));
    }
}
