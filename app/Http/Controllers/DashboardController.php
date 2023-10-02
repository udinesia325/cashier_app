<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function index() {
        if(auth()->user()->role == "admin"){
            return Inertia::render("Admin/Dashboard/Dashboard");
        }
        return Inertia::render("Dashboard");
    }
}
