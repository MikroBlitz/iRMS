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

const modelName = 'user';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const chartData: Ref<Chart[]> = ref([]);

const itemLinks = [
    {
        icon: 'solar:user-circle-linear',
        iconColor: 'text-foreground',
        path: '/users/manage-users',
        textColor: 'text-foreground',
        title: 'Manage Users',
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
            content: 'Users page',
            name: 'Manage users page',
        },
    ],
    title: pageTitle.value,
});

onMounted(async () => {
    const { charts } = await useChartData();
    chartData.value = charts.filter(
        (chart) => chart.title === 'Total Users' || chart.title === 'Customers',
    );
});
</script>
