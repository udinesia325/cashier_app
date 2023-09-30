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
    public function index():Response {
        $category = Category::all();
        $type = Type::all();
        return Inertia::render("Admin/Category/Category",compact("category","type"));
    }
    public function store(Request $request) {
        $request->validate([
            "name" =>"required|max:255|unique:categories,name"
        ]);
        Category::create([
            "name" => $request->input("name")
        ]);
        $request->session()->flash("message","Berhasil menambahkan kategori baru");
        return redirect()->to(route("category"));
    }
}
