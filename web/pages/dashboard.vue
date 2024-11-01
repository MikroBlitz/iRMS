<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>

        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="pageTitle" :icon="icon" :search-bar="false" />
            <div
                class="p-4 border-2 rounded-b w-full border-secondary dark:border-primary h-full min-h-[780px]"
            >
                <div
                    class="flex gap-4 flex-wrap items-center m-auto justify-evenly"
                >
                    <ChartSimple
                        v-for="(chart, index) in charts"
                        :key="index"
                        :title="chart.title"
                        :value="chart.value"
                        :icon="chart.icon"
                        :color="chart.color"
                        :border-color="chart.borderColor"
                    />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import {
    totalSales,
    totalUsers,
    totalCategories,
    totalProducts,
    totalOrders,
    totalInventoryStockValue,
} from '~/graphql/Dashboard';
import type { User, Order, Category, Product } from '~/types/graphql';

const pageTitle = 'Dashboard';
const icon = 'mdi:view-dashboard-outline';

const countUsers = await useAsyncQuery(totalUsers);
const countCategories = await useAsyncQuery(totalCategories);
const countProducts = await useAsyncQuery(totalProducts);
const countOrders = await useAsyncQuery(totalOrders);
const inventoryStockValue = await useAsyncQuery(totalInventoryStockValue);
const totalSalesValue = await useAsyncQuery(totalSales);

const users: User[] = (countUsers.data.value as User[]) || [];
const categories: Category[] = (countCategories.data.value as Category[]) || [];
const products: Product[] = (countProducts.data.value as Product[]) || [];
const orders: Order[] = (countOrders.data.value as Order[]) || [];

const stocksResult = computed(() => inventoryStockValue.data.value);
const calculateTotalInventoryStockValue = (products: any[]) =>
    products.reduce(
        (totalValue, product) =>
            totalValue +
            product.inventories.reduce(
                (sum, inventory) => sum + inventory.qty * product.price,
                0,
            ),
        0,
    );
const totalInventoryStockValues = computed(() => {
    const products = stocksResult.value?.products || [];
    return calculateTotalInventoryStockValue(products);
});

const calculateTotalSalesValue = (totalSalesValue: any) => {
    const orders = totalSalesValue.data.value?.orders || [];
    return orders.reduce((totalValue: number, order: any) => {
        return totalValue + order.total_amount;
    }, 0);
};
const totalSalesValues = computed(() => {
    return calculateTotalSalesValue(totalSalesValue);
});

const charts = computed(() => [
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

definePageMeta({
    layout: 'app-layout',
});
</script>
