<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <ClientOnly>
                <PageHeader :page-title="pageTitle" />

                <ChartSimple
                    v-for="chart in ordersChart"
                    :key="chart.title"
                    :title="chart.title"
                    :value="chart.value"
                    :icon="chart.icon"
                    :color="chart.color"
                    :border-color="chart.borderColor"
                />

                <PageRouter :item-links="itemLinks" />
            </ClientOnly>
        </main>
    </div>
</template>

<script setup lang="ts">
const modelName = 'order';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const { charts } = useChartData();
const ordersChart = computed(() =>
    charts.filter((chart) => chart.title === 'Total Orders'),
);

const itemLinks = [
    {
        icon: 'solar:cart-outline',
        iconColor: 'text-foreground',
        path: '/orders/manage-orders',
        textColor: 'text-foreground',
        title: 'Manage Orders',
    },
    {
        icon: 'solar:user-hand-up-linear',
        iconColor: 'text-foreground',
        path: '/customers/manage-customers',
        textColor: 'text-foreground',
        title: 'Manage Customers',
    },
];

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Orders page',
            name: 'Manage orders page',
        },
    ],
    title: pageTitle.value,
});
</script>
