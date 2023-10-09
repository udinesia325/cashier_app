<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        // total semua produk
        DB::beginTransaction();
        try {
            $total = collect($request->products)->reduce(function ($acc, $curr) {
                return $acc += ($curr["qty"] * $curr["price"]);
            }, 0);
            $order = Order::create([
                "user_id" => auth()->user()->id,
                "total" => $total,
                "pay" => $request->pay,
                "change" => $request->change,
                "table_name" => $request->table_name,
            ]);
            $products = collect($request->products)->map(function ($prod) use ($order) {
                return [
                    "product_id" => $prod['id'],
                    "order_id" => $order->id,
                    "quantity" => $prod['qty'],
                    "subtotal" => $prod['qty'] * $prod['price'],
                    "created_at" => now(),
                    "updated_at" => now(),
                ];
            });
            OrderItem::insert($products->toArray());
            DB::commit();
            return redirect()->to(route("dashboard"));
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->to(route("dashboard"));
        }
    }
}
