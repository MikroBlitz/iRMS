<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <ClientOnly>
                <PageHeader :page-title="pageTitle" />
                <VueDraggable
                    ref="el"
                    v-model="chartData"
                    class="flex flex-col md:grid md:grid-cols-3 md:gap-1 sm:items-start"
                    :animation="500"
                    group="charts"
                    @end=""
                >
                    <ChartSimple
                        v-for="chart in chartData"
                        :key="chart.title"
                        :title="chart.title"
                        :value="chart.value"
                        :icon="chart.icon"
                        :color="chart.color"
                        :border-color="chart.borderColor"
                        :loading="chart.loading"
                    />
                </VueDraggable>
                <PageRouter :item-links="itemLinks" />
            </ClientOnly>
        </main>
    </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { Chart } from '~/types';

const modelName = 'inventory';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const chartData: Ref<Chart[]> = ref([]);

const itemLinks = [
    {
        icon: 'solar:box-minimalistic-linear',
        iconColor: 'text-foreground',
        path: '/inventories/manage-inventories',
        textColor: 'text-foreground',
        title: 'Manage Inventories',
    },
    {
        icon: 'mdi:garage-warning',
        iconColor: 'text-foreground',
        path: '/inventories/manage-critical-stocks',
        textColor: 'text-foreground',
        title: 'Critical Stocks',
    },
    {
        icon: 'solar:filter-outline',
        iconColor: 'text-foreground',
        path: '/categories/manage-categories',
        textColor: 'text-foreground',
        title: 'Manage Categories',
    },
];

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Inventories page',
            name: 'Manage inventory page',
        },
    ],
    title: pageTitle.value,
});

onMounted(async () => {
    const { charts } = await useChartData();
    chartData.value = charts.filter(
        (chart) =>
            chart.title === 'Inventory Stock Value' ||
            chart.title === 'Categories',
    );
});
</script>
