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

    const areaChart = ref([
        {
            name: 'Jan',
            predicted: Math.floor(Math.random() * 2000) + 500,
            total: Math.floor(Math.random() * 2000) + 500,
        },
        {
            name: 'Feb',
            predicted: Math.floor(Math.random() * 2000) + 500,
            total: Math.floor(Math.random() * 2000) + 500,
        },
        {
            name: 'Mar',
            predicted: Math.floor(Math.random() * 2000) + 500,
            total: Math.floor(Math.random() * 2000) + 500,
        },
        {
            name: 'Apr',
            predicted: Math.floor(Math.random() * 2000) + 500,
            total: Math.floor(Math.random() * 2000) + 500,
        },
        {
            name: 'May',
            predicted: Math.floor(Math.random() * 2000) + 500,
            total: Math.floor(Math.random() * 2000) + 500,
        },
        {
            name: 'Jun',
            predicted: Math.floor(Math.random() * 2000) + 500,
            total: Math.floor(Math.random() * 2000) + 500,
        },
        {
            name: 'Jul',
            predicted: Math.floor(Math.random() * 2000) + 500,
            total: Math.floor(Math.random() * 2000) + 500,
        },
    ]);

    const lineChart = ref([
        {
            'Export Growth Rate': 2.04,
            'Import Growth Rate': 1.53,
            year: 1970,
        },
        {
            'Export Growth Rate': 1.96,
            'Import Growth Rate': 1.58,
            year: 1971,
        },
        {
            'Export Growth Rate': 1.96,
            'Import Growth Rate': 1.61,
            year: 1972,
        },
    ]);

    const barChart = ref([
        {
            name: 'Jan',
            predicted: Math.floor(Math.random() * 2000) + 500,
            total: Math.floor(Math.random() * 2000) + 500,
        },
        {
            name: 'Feb',
            predicted: Math.floor(Math.random() * 2000) + 500,
            total: Math.floor(Math.random() * 2000) + 500,
        },
        {
            name: 'Mar',
            predicted: Math.floor(Math.random() * 2000) + 500,
            total: Math.floor(Math.random() * 2000) + 500,
        },
    ]);

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
            borderColor: 'border-red-300/80 dark:border-red-500/50',
            color: 'bg-secondary/50',
            icon: 'mdi:sms',
            loading: loading.value,
            title: 'Total Sent Messages',
            value: data.value.messagesCount || 0,
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
            value: currencyFormat(totalInventoryStockValues.value) || 0,
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
            value: currencyFormat(totalSalesValues.value) || 0,
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
        areaChart,
        barChart,
        charts,
        lineChart,
    };
}
