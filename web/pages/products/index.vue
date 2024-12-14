<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <ClientOnly>
                <PageHeader :page-title="pageTitle" />

                <ChartSimple
                    v-for="chart in productChart"
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
const modelName = 'product';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const { charts } = useChartData();
const productChart = computed(() =>
    charts.filter((chart) => chart.title === 'Products'),
);

const itemLinks = [
    {
        icon: 'solar:shop-linear',
        iconColor: 'text-foreground',
        path: '/products/manage-products',
        textColor: 'text-foreground',
        title: 'Manage Products',
    },
    {
        icon: 'solar:box-minimalistic-linear',
        iconColor: 'text-foreground',
        path: '/inventories/manage-inventories',
        textColor: 'text-foreground',
        title: 'Manage Stocks',
    },
];

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Products page',
            name: 'Manage products page',
        },
    ],
    title: pageTitle.value,
});
</script>
