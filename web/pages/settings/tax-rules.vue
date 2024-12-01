<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <TableHeader :title="pageTitle" :icon="icon" :search-bar="false" />
            <div
                class="flex w-full justify-start flex-col items-center gap-1 p-4 border-2 border-secondary dark:border-primary min-h-[750px]"
            >
                <Label class="text-md font-bold mb-4"> Add Tax Rules </Label>
                <Button class="p-6 w-[250px] hover:bg-accent">
                    Create Tax Rule
                </Button>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
const pageTitle = ref('Tax Rules')
const icon = 'mdi:percent'

definePageMeta({
    layout: 'app-layout',
})

useHead({
    meta: [
        {
            content: 'Add, edit, and delete tax rules',
            name: 'Manage tax rules',
        },
    ],
    title: pageTitle.value,
})
</script>
