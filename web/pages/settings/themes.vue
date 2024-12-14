<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <PageHeader
                :page-title="pageTitle"
                :icon="icon"
                :show-icon="true"
            />
            <div
                class="flex w-full justify-start flex-col gap-1 p-4 min-h-[750px]"
            >
                <Label class="text-md font-bold mb-4">Select a theme</Label>
                <div
                    v-for="item in themeOptions"
                    :key="item.id"
                    class="flex items-center gap-2 ml-4"
                >
                    <Button
                        variant="outline"
                        class="p-5 rounded-full hover:bg-accent"
                        :class="{ 'bg-primary': theme.name === item.value }"
                        @click="changeTheme(item.value)"
                    />
                    <Label
                        :class="{ 'text-primary': theme.name === item.value }"
                        class="cursor-pointer"
                        @click="changeTheme(item.value)"
                    >
                        {{ item.label }}
                    </Label>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { themeOptions } from '~/composables/useConstant';

const theme = useTheme();
const changeTheme = (item: string) => {
    theme.name = item;

    toasts('Theme changed to ' + toTitleCase(item), {
        autoClose: 1000,
        position: 'bottom-right',
        type: 'success',
    });
};

const pageTitle = ref('Themes');
const icon = 'mdi:theme-light-dark';

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Add, edit, and delete themes',
            name: 'Manage themes',
        },
    ],
    title: pageTitle.value,
});
</script>
