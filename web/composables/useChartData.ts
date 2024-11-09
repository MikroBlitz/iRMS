import { reactiveComputed } from '@vueuse/core';
import {
    totalSales,
    totalUsers,
    totalCategories,
    totalProducts,
    totalOrders,
    totalInventoryStockValue,
} from '~/graphql/Dashboard';
import type { User, Order, Category, Product } from '~/types/graphql';

export default function useChartData() {
    const countUsers = useAsyncQuery(totalUsers);
    const countCategories = useAsyncQuery(totalCategories);
    const countProducts = useAsyncQuery(totalProducts);
    const countOrders = useAsyncQuery(totalOrders);
    const inventoryStockValue = useAsyncQuery(totalInventoryStockValue);
    const totalSalesValue = useAsyncQuery(totalSales);

    const users: User[] | any = (countUsers.data.value as User[]) || [];
    const categories: Category[] | any =
        (countCategories.data.value as Category[]) || [];
    const products: Product[] | any =
        (countProducts.data.value as Product[]) || [];
    const orders: Order[] | any = (countOrders.data.value as Order[]) || [];

    const stocksResult: any = computed(() => inventoryStockValue.data.value);

    const calculateTotalInventoryStockValue = (products: Product[] | any) => {
        return products.reduce(
            (totalValue: any, product: any) =>
                totalValue +
                product.inventories.reduce(
                    (sum: number | any, inventory: any) =>
                        sum + inventory.qty * product.price,
                    0,
                ),
            0,
        );
    };

    const totalInventoryStockValues = computed(() => {
        const products = stocksResult.value?.products || [];
        return calculateTotalInventoryStockValue(products);
    });

    const calculateTotalSalesValue = (totalSalesValue: any) => {
        const orders = totalSalesValue.data.value?.orders || [];
        return orders.reduce(
            (totalValue: number, order: Order) =>
                totalValue + order.total_amount,
            0,
        );
    };

    const totalSalesValues = computed(() =>
        calculateTotalSalesValue(totalSalesValue),
    );

    const charts = reactiveComputed(() => [
        {
            title: 'Total Users',
            value: users.usersCount,
            icon: 'mdi:account-multiple',
            color: 'bg-card dark:bg-black/50',
            borderColor: 'border-blue-300/80 dark:border-blue-500/50',
        },
        {
            title: 'Categories',
            value: categories.categoriesCount,
            icon: 'mdi:folder-multiple-outline',
            color: 'bg-card dark:bg-black/50',
            borderColor: 'border-green-300/80 dark:border-green-500/50',
        },
        {
            title: 'Products',
            value: products.productsCount,
            icon: 'mdi:cube-outline',
            color: 'bg-card dark:bg-black/50',
            borderColor: 'border-red-300/80 dark:border-red-500/50',
        },
        {
            title: 'Inventory Stock Value',
            value: currencyFormat(totalInventoryStockValues.value),
            icon: 'mdi:cash-multiple',
            color: 'bg-card dark:bg-black/50',
            borderColor: 'border-purple-300/80 dark:border-purple-500/50',
        },
        {
            title: 'Total Orders',
            value: orders.ordersCount,
            icon: 'mdi:cart-outline',
            color: 'bg-card dark:bg-black/50',
            borderColor: 'border-yellow-300/80 dark:border-yellow-500/50',
        },
        {
            title: 'Overall Sales',
            value: currencyFormat(totalSalesValues.value),
            icon: 'mdi:currency-usd',
            color: 'bg-card dark:bg-black/50',
            borderColor: 'border-pink-300/80 dark:border-pink-500/50',
        },
    ]);

    return {
        charts,
    };
}
