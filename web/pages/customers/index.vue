<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <ClientOnly>
                <PageHeader :page-title="pageTitle" />

                <ChartSimple
                    v-for="chart in customerChart"
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
const modelName = 'customer';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const { charts } = useChartData();
const customerChart = computed(() =>
    charts.filter((chart) => chart.title === 'Total Customers'),
);

const itemLinks = [
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
            content: 'Products page',
            name: 'Manage products page',
        },
    ],
    title: pageTitle.value,
});
</script>
