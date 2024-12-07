<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <TableHeader :title="pageTitle" :icon="icon" :search-bar="false" />
            <div
                class="flex w-full justify-start flex-col gap-1 p-4 min-h-[750px]"
            >
                <Label class="text-md font-bold mb-4">Select a theme</Label>
                <Button
                    v-for="item in themeOptions"
                    :key="item.id"
                    class="p-6 w-full md:w-1/5 hover:bg-accent"
                    :class="{ 'bg-accent': theme.name === item.value }"
                    @click="changeTheme(item.value)"
                >
                    {{ item.label }}
                </Button>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { themeOptions } from '~/composables/useConstant'

const theme = useTheme()
const changeTheme = (item: string) => {
    theme.name = item

    toasts('Theme changed to ' + toTitleCase(item), {
        autoClose: 1000,
        position: 'bottom-right',
        type: 'success',
    })
}

const pageTitle = ref('Themes')
const icon = 'mdi:theme-light-dark'

definePageMeta({
    layout: 'app-layout',
})

useHead({
    meta: [
        {
            content: 'Add, edit, and delete themes',
            name: 'Manage themes',
        },
    ],
    title: pageTitle.value,
})
</script>
