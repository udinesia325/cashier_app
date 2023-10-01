<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|max:255|unique:types,name"
        ]);
        Type::create([
            "name" => $request->input("name")
        ]);
        $request->session()->flash("message", "Berhasil menambahkan tipe baru");
        return redirect()->to(route("category"));
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            "name" => "required"
        ]);
        $type = Type::findOrFail($id);
        if ($request->input("name") != $type->name) {
            $request->validate([
                "name" => "unique:types,name"
            ]);
        }
        $type->name = $request->input("name");
        $type->save();
        return redirect()->to(route("category"));
    }
    function delete(Request $request)
    {
        Type::findOrFail($request->input("id"))->delete();
        $request->session()->flash("message", "Berhasil menghapus kategori");
        return redirect()->to(route("category"));
    }
}
