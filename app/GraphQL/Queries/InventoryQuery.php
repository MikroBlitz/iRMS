<?php

namespace App\GraphQL\Queries;
use App\Modules\Inventory\Models\Inventory;
use Illuminate\Database\Eloquent\Collection;

class InventoryQuery
{
    /**
     * Fetch inventories with low stock.
     *
     * @param null $rootValue
     * @param array $args
     * @return Collection
     */
    public function lowStockItems(null $rootValue, array $args): Collection
    {
        $value = $args['value'] ?? 10;
        return Inventory::lowStock($value)->get();
    }
}
