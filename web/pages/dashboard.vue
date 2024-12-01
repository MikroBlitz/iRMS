<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="pageTitle" :icon="icon" :search-bar="false" />
            <div
                class="p-4 border-2 rounded-b w-full border-secondary dark:border-primary h-full min-h-[780px]"
            >
                <div
                    class="flex gap-4 flex-wrap items-center m-auto justify-evenly"
                >
                    <ChartSimple
                        v-for="(chart, index) in charts"
                        :key="index"
                        :title="chart.title"
                        :value="chart.value"
                        :icon="chart.icon"
                        :color="chart.color"
                        :border-color="chart.borderColor"
                    />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import useChartData from '~/composables/useChartData'

const pageTitle = ref('Dashboard')
const icon = 'mdi:view-dashboard-outline'
const { charts } = useChartData()

definePageMeta({
    layout: 'app-layout',
})

useHead({
    meta: [{ content: 'View dashboard', name: 'Dashboard' }],
    title: pageTitle.value,
})
</script>
