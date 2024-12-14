<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <ClientOnly>
                <PageHeader :page-title="pageTitle" />
                <div
                    class="flex flex-col md:grid md:grid-cols-3 md:gap-1 sm:items-start"
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
                </div>
                <PageRouter :item-links="itemLinks" />
            </ClientOnly>
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Chart } from '~/types';

const modelName = 'point of sale';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const chartData: Ref<Chart[]> = ref([]);

const itemLinks = [
    {
        icon: 'mdi:monitor-dashboard',
        iconColor: 'text-foreground',
        path: '/pos/dashboard',
        textColor: 'text-foreground',
        title: 'POS Dashboard',
    },
];

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'POS page',
            name: 'Manage POS page',
        },
    ],
    title: pageTitle.value,
});

onMounted(async () => {
    const { charts } = await useChartData();
    chartData.value = charts.filter(
        (chart) =>
            chart.title === 'Overall Sales' || chart.title === 'Total Orders',
    );
});
</script>
