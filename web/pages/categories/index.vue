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

const modelName = 'category';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const chartData: Ref<Chart[]> = ref([]);

const itemLinks = [
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
            content: 'Categories page',
            name: 'Manage categories page',
        },
    ],
    title: pageTitle.value,
});

onMounted(async () => {
    const { charts } = await useChartData();
    chartData.value = charts.filter((chart) => chart.title === 'Categories');
});
</script>
