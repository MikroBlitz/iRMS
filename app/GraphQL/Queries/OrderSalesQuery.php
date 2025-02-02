<?php

namespace App\GraphQL\Queries;

use App\Modules\Order\Models\Order;
use Carbon\Carbon;

class OrderSalesQuery
{
    public function dailySales(): float
    {
        $today = Carbon::now()->endOfDay();

        $totalSales = Order::whereDate('created_at', $today)
            ->where('status', 0)
            ->sum('total_amount');

        return (float) $totalSales;
    }

    public function weeklySales(): float
    {
        $startOfWeek = Carbon::now()->startOfWeek(Carbon::SUNDAY);
        $today = Carbon::now()->endOfDay();

        $totalSales = Order::whereBetween('created_at', [$startOfWeek, $today])
            ->where('status', 0)
            ->sum('total_amount');

        return (float) $totalSales;
    }

    public function monthlySales(): float
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        $today = Carbon::now()->endOfDay();

        $totalSales = Order::whereBetween('created_at', [$startOfMonth, $today])
            ->where('status', 0)
            ->sum('total_amount');

        return (float) $totalSales;
    }

    public function overallSales(): float
    {
        $totalSales = Order::where('status', 0)->sum('total_amount');

        return (float) $totalSales;
    }
}
