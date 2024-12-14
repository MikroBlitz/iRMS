<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <ClientOnly>
                <PageHeader :page-title="pageTitle" />

                <ChartSimple
                    v-for="chart in categoryChart"
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
const modelName = 'category';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const { charts } = useChartData();
const categoryChart = computed(() =>
    charts.filter((chart) => chart.title === 'Categories'),
);

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
            content: 'Products page',
            name: 'Manage products page',
        },
    ],
    title: pageTitle.value,
});
</script>
