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
const pageTitle = ref('Settings');

const itemLinks = [
    {
        icon: 'mdi:theme-light-dark',
        iconColor: 'text-foreground',
        path: '/settings/themes',
        textColor: 'text-foreground',
        title: 'Themes',
    },
    {
        icon: 'mdi:currency-usd',
        iconColor: 'text-foreground',
        path: '/settings/promotions',
        textColor: 'text-foreground',
        title: 'Promotions',
    },
    {
        icon: 'mdi:percent',
        iconColor: 'text-foreground',
        path: '/settings/tax-rules',
        textColor: 'text-foreground',
        title: 'Tax Rules',
    },
    {
        icon: 'mdi:blog',
        iconColor: 'text-foreground',
        path: '/settings/logs',
        textColor: 'text-foreground',
        title: 'Logs',
    },
    {
        icon: 'mdi:trash-can-outline',
        iconColor: 'text-foreground',
        path: '/settings/recycle-bin',
        textColor: 'text-foreground',
        title: 'Recycle Bin',
    },
];

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Add, edit, and delete settings',
            name: 'Manage settings',
        },
    ],
    title: pageTitle.value,
});
</script>
