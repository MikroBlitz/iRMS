<template>
    <div class="w-full h-dvh mx-auto p-0.5">
        <div v-auto-animate>
            <Header :title="pageTitle" back-route="dashboard" />

            <MessagesBody />
        </div>
    </div>
</template>

<script setup lang="ts">
const pageTitle = ref('Messages')

definePageMeta({
    layout: 'messages',
})

useHead({
    meta: [
        {
            content: 'Add, edit, and delete messages',
            name: 'Manage messages',
        },
    ],
    title: pageTitle.value,
})
</script>
