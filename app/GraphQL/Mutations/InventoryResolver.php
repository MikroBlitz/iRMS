<?php

namespace App\GraphQL\Mutations;
use App\Modules\Inventory\Models\Inventory;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class InventoryResolver
{
    /**
     * Create a new class instance.
     */
    /**
     * Subtract inventory stock for a product.
     *
     * @param null $rootValue
     * @param array $args
     * @param GraphQLContext $context
     * @param ResolveInfo $resolveInfo
     * @return array
     * @throws Exception
     */
    public function reduceInventory(null $rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): array
    {
        $updatedInventories = [];

        foreach ($args['products'] as $product) {
            $inventory = Inventory::where('product_id', $product['product_id'])->first();

            if (!$inventory) {
                throw new \Exception('Inventory not found for product ID: ' . $product['product_id']);
            }

            $inventory->qty -= $product['qty'];

            if ($inventory->qty < 0) {
                throw new \Exception('Not enough stock available for product ID: ' . $product['product_id']);
            }

            $inventory->save();
            $updatedInventories[] = $inventory;
        }

        return $updatedInventories;
    }
}
