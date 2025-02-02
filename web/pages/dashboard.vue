<template>
    <div>
        <div v-auto-animate class="max-w-screen-2xl mx-auto w-auto">
            <PageHeader :page-title="pageTitle" />
            <VueDraggable
                ref="el"
                v-model="chartData"
                class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-1 sm:items-start"
                :animation="500"
                group="charts"
                :disabled="isMobile"
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

            <VueDraggable
                ref="el"
                v-model="charts"
                class="p-2 flex flex-col md:grid md:grid-cols-3 gap-5 sm:items-start"
                :animation="500"
                group="charts"
                :disabled="isMobile"
                @end=""
            >
                <Card
                    class="py-6 pr-6 bg-[hsl(var(--secondary))]/50 border border-[hsl(var(--border))] transition duration-300 hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.5)] rounded-2xl"
                >
                    <BarChart
                        :data="barChartData"
                        index="name"
                        :categories="['total', 'predicted']"
                        :y-formatter="
                            (tick, i) => {
                                return typeof tick === 'number'
                                    ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                                    : '';
                            }
                        "
                    />
                </Card>
                <Card
                    class="py-6 pr-6 bg-[hsl(var(--secondary))]/50 border border-[hsl(var(--border))] transition duration-300 hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.5)] rounded-2xl"
                >
                    <LineChart
                        :data="lineChartData"
                        index="year"
                        :categories="[
                            'Export Growth Rate',
                            'Import Growth Rate',
                        ]"
                        :y-formatter="
                            (tick, i) => {
                                return typeof tick === 'number'
                                    ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                                    : '';
                            }
                        "
                    />
                </Card>
                <Card
                    class="py-6 pr-6 bg-[hsl(var(--secondary))]/50 border border-[hsl(var(--border))] transition duration-300 hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.5)] rounded-2xl"
                >
                    <AreaChart
                        :data="lineChartData"
                        index="name"
                        :categories="['total', 'predicted']"
                    />
                </Card>
            </VueDraggable>
            <PageRouter :item-links="itemLinks" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { Chart } from '~/types';
import { BarChart } from '@/components/ui/chart-bar';
import { AreaChart } from '@/components/ui/chart-area';
import { LineChart } from '@/components/ui/chart-line';

const pageTitle = ref('Dashboard');
const chartData: Ref<Chart[]> = ref([]);

const charts = ref();
const lineChartData = ref([]); // TODO: dynamic data
const barChartData = ref([]); // TODO: dynamic data
const areaChartData = ref([]); // TODO: dynamic data

const itemLinks = [
    {
        icon: 'solar:settings-linear',
        iconColor: 'text-foreground',
        path: '/settings',
        textColor: 'text-foreground',
        title: 'Settings',
    },
    {
        icon: 'mdi:monitor-dashboard',
        iconColor: 'text-foreground',
        path: '/pos',
        textColor: 'text-foreground',
        title: 'Point of Sale',
    },
    {
        icon: 'solar:cart-outline',
        iconColor: 'text-foreground/80',
        path: '/orders',
        textColor: 'text-foreground/80',
        title: 'Orders',
    },
    {
        icon: 'solar:user-circle-linear',
        iconColor: 'text-foreground/80',
        path: '/users',
        textColor: 'text-foreground/80',
        title: 'Users',
    },
    {
        icon: 'solar:shop-linear',
        iconColor: 'text-foreground/80',
        path: '/products',
        textColor: 'text-foreground/80',
        title: 'Products',
    },
    {
        icon: 'solar:box-minimalistic-linear',
        iconColor: 'text-foreground/80',
        path: '/inventories',
        textColor: 'text-foreground/80',
        title: 'Inventories',
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
];

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [{ content: 'View dashboard', name: 'Dashboard' }],
    title: pageTitle.value,
});

const isMobile = inject('isMobile');

onMounted(async () => {
    const { areaChart, barChart, charts, lineChart } = await useChartData();
    chartData.value = charts.filter(
        (chart) =>
            chart.title !== 'Daily Sales' &&
            chart.title !== 'Weekly Sales' &&
            chart.title !== 'Monthly Sales',
    );
    lineChartData.value = lineChart;
    barChartData.value = barChart;
    areaChartData.value = areaChart;
});
</script>
