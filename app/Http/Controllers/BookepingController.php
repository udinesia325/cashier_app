<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class BookepingController extends Controller
{
    public function index(): Response
    {
        $user = User::where("role", "staff")->get();
        return Inertia::render("Admin/Bookeping/Bookeping", compact("user"));
    }

    // ini api
    public function get(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "userId" => "required|numeric"
        ]);
        if ($validator->fails()) {
            return response()->json($validator->getMessageBag())->setStatusCode(400);
        }
        $startDate = $request->date("startDate") ?? now();
        $endDate = $request->date("endDate") ?? now();
        $userId = $request->input("userId");
        $data = Order::with("orderItem","orderItem.product:id,name,price,image")
            ->has("user")
            ->whereHas("user", function (Builder $builder) use ($userId) {
                $builder->where('id', $userId);
            })
            ->whereBetween("created_at", [$startDate, $endDate])
            ->get()
            ->map(function ($d) {
                $d["total"] = 0;
                foreach($d->orderItem as $item){
                    $d["total"] += ($item['quantity'] * $item['subtotal']);
                }
                return $d;
            })->toArray();
        return response()->json([
            "start" => $startDate->toDateString(),
            "end" => $endDate->toDateString(),
            "data" => $data,
        ]);
    }
}
