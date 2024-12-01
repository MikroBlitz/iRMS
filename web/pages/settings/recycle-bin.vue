<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <TableHeader :title="pageTitle" :icon="icon" :search-bar="false" />
            <div
                class="flex w-full justify-start flex-col items-center gap-1 p-4 border-2 border-secondary dark:border-primary min-h-[750px]"
            >
                <Label class="text-md font-bold mb-4">
                    Deleted Items Here
                </Label>
                <Button class="p-6 w-[250px] hover:bg-accent">
                    Restore?
                </Button>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
const pageTitle = ref('Recycle Bin')
const icon = 'mdi:trash-can-outline'

definePageMeta({
    layout: 'app-layout',
})

useHead({
    meta: [
        {
            content: 'Delete items from recycle bin',
            name: 'Manage recycle bin',
        },
    ],
    title: pageTitle.value,
})
</script>
