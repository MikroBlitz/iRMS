<template>
    <div>
        <div v-auto-animate class="max-w-screen-2xl mx-auto w-auto">
            <PageHeader :page-title="pageTitle" />
            <div
                class="flex flex-col md:grid md:grid-cols-3 md:gap-1 sm:items-start"
            >
                <ChartSimple
                    v-for="(chart, index) in chartData"
                    :key="index"
                    :title="chart.title"
                    :value="chart.value"
                    :icon="chart.icon"
                    :color="chart.color"
                    :border-color="chart.borderColor"
                    :loading="chart.loading"
                />
            </div>
            <PageRouter :item-links="itemLinks" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Chart } from '~/types';

const pageTitle = ref('Dashboard');
const chartData: Ref<Chart[]> = ref([]);

const itemLinks = [
    {
        icon: 'mdi:monitor-dashboard',
        iconColor: 'text-foreground',
        path: '/pos',
        textColor: 'text-foreground',
        title: 'Point of Sale',
    },
    {
        icon: 'solar:chat-round-line-linear',
        iconColor: 'text-foreground',
        path: '/messages',
        textColor: 'text-foreground',
        title: 'Messages',
    },
    {
        icon: 'mdi:form-select',
        iconColor: 'text-foreground',
        path: '/reports',
        textColor: 'text-foreground',
        title: 'Reports',
    },
    {
        icon: 'solar:settings-linear',
        iconColor: 'text-foreground',
        path: '/settings',
        textColor: 'text-foreground',
        title: 'Settings',
    },
];

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [{ content: 'View dashboard', name: 'Dashboard' }],
    title: pageTitle.value,
});

onMounted(async () => {
    const { charts } = await useChartData();
    chartData.value = charts;
});
</script>
