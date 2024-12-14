<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <ClientOnly>
                <PageHeader :page-title="pageTitle" />
                <PageRouter :item-links="itemLinks" />
            </ClientOnly>
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Chart } from '~/types';

const modelName = 'message';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const chartData: Ref<Chart[]> = ref([]);

const itemLinks = [
    {
        icon: 'solar:chat-round-line-linear',
        iconColor: 'text-foreground',
        path: '/messages/dashboard',
        textColor: 'text-foreground',
        title: 'Go to Messages',
    },
];

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Messages page',
            name: 'Manage Messages page',
        },
    ],
    title: pageTitle.value,
});
</script>
