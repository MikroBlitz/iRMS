<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="pageTitle" :icon="icon" />
        </main>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'

const pageTitle = ref('Online Forms')
const icon = 'mdi:form-select'

definePageMeta({
    layout: 'app-layout',
})

useHead({
    meta: [
        {
            content: 'Add, edit, and delete online forms',
            name: 'Manage online forms',
        },
    ],
    title: pageTitle.value,
})
</script>
