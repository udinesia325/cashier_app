<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    //
    public function index(): Response
    {
        $data = User::where("role", "staff")->get();
        return Inertia::render("Admin/User", compact("data"));
    }
    public function add(): Response
    {
        return Inertia::render("Admin/AddUser");
    }
}
