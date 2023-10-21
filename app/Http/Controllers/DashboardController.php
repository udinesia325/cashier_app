<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function index()
    {
        if (auth()->user()->role != "admin") {
            return Inertia::render("Dashboard");
        }

        // $data = OrderItem::whereMonth("");
        return Inertia::render("Admin/Dashboard/Dashboard");
    }

    // untuk api
    public function monthly(Request $request)
    {
        $date = $request->date("date") ?? now();

        $dailyMoney = Order::whereDay("created_at", $date)->sum("total");

        $productSold = OrderItem::whereMonth("created_at", $date)
            ->whereYear("created_at", $date)->sum("quantity");


        $startWeek = $date->copy()->startOfWeek()->format("Y-m-d");
        $endWeek = $date->copy()->endOfWeek()->format("Y-m-d");
        $monthlyMoney = Order::whereMonth("created_at", $date->copy()->month)
            ->whereYear("created_at", $date->copy()->year)->sum("total");

        $weeklyMoney = Order::whereBetween("created_at", [$startWeek, $endWeek])
            ->sum("total");
        return response()->json([
            "productSold" => $productSold,
            "monthlyMoney" => $monthlyMoney,
            "weeklyMoney" => $weeklyMoney,
            "dailyMoney" => $dailyMoney
        ])->setStatusCode(200);
    }
    public function monthlyChart(Request $request)
    {
        $date = $request->date("date") ?? now();
        $db = DB::table("orders")
            ->select(
                DB::raw('WEEK(created_at) as week'),
                DB::raw('SUM(total) as total_sales')
            )
            ->whereMonth("created_at", $date)
            ->whereYear("created_at", $date)
            ->groupBy(DB::raw('WEEK(created_at)'))
            ->get();

        $result = [];
        foreach ($db as $d) {
            $weekNumber = $d->week; // Ganti dengan angka yang Anda miliki
            $bulan = $date->month; // Ganti dengan bulan yang Anda inginkan (contoh Oktober)

            // Tentukan tanggal awal bulan
            $tanggalAwalBulan = Carbon::create($date->year, $bulan, 1)->startOfMonth();

            // Konversi angka minggu menjadi tanggal
            $tanggalMinggu = $tanggalAwalBulan->isoWeek($weekNumber);

            // Hitung minggu keberapa dalam bulan
            // minggu terakhir (5) menjadi 0
            $mingguKeberapa = intval(($tanggalMinggu->day - 1) / 7);
            $result[] = [
                // "week" => $d->week,
                "total_sales" => $d->total_sales,
                "week" => $mingguKeberapa == 0 ? 5 : $mingguKeberapa
            ];
        }

        return response()->json([
            "data" => $result,
        ]);
    }
    function productTerlaris(Request $request)
    {
        $date = $request->date("date") ?? now();

        $data = DB::table("order_items")
            ->select(
                DB::raw("SUM(products.price*quantity) as total"),
                DB::raw("products.name as nama_barang"),
                DB::raw("SUM(quantity) as terjual"),
            )
            ->join("products", "products.id", "=", "order_items.product_id")
            ->where(DB::raw("month(order_items.created_at)"), $date->month)
            ->groupBy("order_items.product_id", "products.name")
            ->orderByDesc("terjual")
            ->limit(3)
            ->get();
        return response()->json(compact("data"));
    }
}
