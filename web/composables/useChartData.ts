import { reactiveComputed } from '@vueuse/core';
import { chartsData } from '~/graphql/Chart';
import type { Product } from '~/types/codegen/graphql';

export default async function useChartData() {
    const { error, loading, result } = useQuery(chartsData);

    if (error.value) {
        console.error('Failed to load dashboard data:', error.value);
        return { charts: [] };
    }

    const data = computed(() => result.value || {});

    const calculateTotalInventoryStockValue = (products: Product[] | any) => {
        return products.reduce(
            (totalValue: number, product: any) =>
                totalValue +
                product.inventories.reduce(
                    (sum: number, inventory: any) =>
                        sum + inventory.qty * product.price,
                    0,
                ),
            0,
        );
    };

    const totalInventoryStockValues = computed(() => {
        const products = data.value.products || [];
        return calculateTotalInventoryStockValue(products);
    });

    const calculateTotalSalesValue = () => {
        const orders = data.value.orders || [];
        return orders.reduce(
            (totalValue: number, order: { total_amount: number }) =>
                totalValue + order.total_amount,
            0,
        );
    };

    const totalSalesValues = computed(() => calculateTotalSalesValue());

    const charts = reactiveComputed(() => [
        {
            borderColor: 'border-blue-300/80 dark:border-blue-500/50',
            color: 'bg-secondary/50',
            icon: 'mdi:account-multiple',
            loading: loading.value,
            title: 'Total Users',
            value: data.value.usersCount || 0,
        },
        {
            borderColor: 'border-green-300/80 dark:border-green-500/50',
            color: 'bg-secondary/50',
            icon: 'mdi:folder-multiple-outline',
            loading: loading.value,
            title: 'Categories',
            value: data.value.categoriesCount || 0,
        },
        {
            borderColor: 'border-red-300/80 dark:border-red-500/50',
            color: 'bg-secondary/50',
            icon: 'mdi:cube-outline',
            loading: loading.value,
            title: 'Products',
            value: data.value.productsCount || 0,
        },
        {
            borderColor: 'border-purple-300/80 dark:border-purple-500/50',
            color: 'bg-secondary/50',
            icon: 'mdi:cash-multiple',
            loading: loading.value,
            title: 'Inventory Stock Value',
            value: currencyFormat(totalInventoryStockValues.value),
        },
        {
            borderColor: 'border-yellow-300/80 dark:border-yellow-500/50',
            color: 'bg-secondary/50',
            icon: 'mdi:cart-outline',
            loading: loading.value,
            title: 'Total Orders',
            value: data.value.ordersCount || 0,
        },
        {
            borderColor: 'border-pink-300/80 dark:border-pink-500/50',
            color: 'bg-secondary/50',
            icon: 'mdi:currency-usd',
            loading: loading.value,
            title: 'Overall Sales',
            value: currencyFormat(totalSalesValues.value),
        },
        {
            borderColor: 'border-orange-300/80 dark:border-orange-500/50',
            color: 'bg-secondary/50',
            icon: 'mdi:user-multiple',
            loading: loading.value,
            title: 'Total Customers',
            value: data.value.customersCount || 0,
        },
    ]);

    return {
        charts,
    };
}
