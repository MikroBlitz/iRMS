<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="pageTitle" :icon="icon" />
        </main>
    </div>
</template>

<script setup lang="ts">
const pageTitle = ref('Reports');
const icon = 'mdi:form-select';

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Add, edit, and delete reports',
            name: 'Manage reports',
        },
    ],
    title: pageTitle.value,
});
</script>
