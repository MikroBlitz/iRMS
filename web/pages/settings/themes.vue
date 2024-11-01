<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>

        <main v-auto-animate class="max-w-screen-2xl mx-auto h-[780px]">
            <TableHeader :title="pageTitle" :icon="icon" :search-bar="false" />
            <div
                class="flex w-full justify-start flex-col items-center gap-1 p-4 border-2 border-secondary dark:border-primary min-h-[750px]"
            >
                <Label class="text-md font-bold mb-4">Select a theme</Label>
                <Button
                    v-for="item in themeOptions"
                    :key="item.id"
                    class="p-6 w-full md:w-1/2 hover:bg-accent"
                    @click="changeTheme(item.value)"
                >
                    {{ item.label }}
                </Button>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'app-layout',
});

const theme = useTheme();
const changeTheme = (item: string) => {
    theme.name = item;

    toasts('Theme changed to ' + toTitleCase(item), {
        type: 'success',
        autoClose: 3000,
    });
};
const themeOptions = [
    { id: 1, label: 'Default', value: 'default' },
    { id: 2, label: 'Azure', value: 'azure' },
    { id: 3, label: 'Bubblegum', value: 'bubblegum' },
    { id: 4, label: 'Crimson', value: 'crimson' },
    { id: 5, label: 'Emerald', value: 'emerald' },
    { id: 6, label: 'Iris', value: 'iris' },
    { id: 7, label: 'Mustard', value: 'mustard' },
];

const pageTitle = 'Themes';
const icon = 'mdi:theme-light-dark';
</script>
