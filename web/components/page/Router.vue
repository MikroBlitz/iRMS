<template>
    <div class="p-2">
        <div class="border-t-2 pb-4 w-full h-2 border-secondary/50" />
        <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
            <div
                v-for="item in itemLinks"
                :key="item.title"
                class="w-full h-full"
            >
                <NuxtLink
                    :to="item.path"
                    class="p-6 hover:bg-accent transition duration-300 rounded flex items-center gap-2 bg-secondary border-2 border-primary/60 dark:hover:bg-accent w-full"
                >
                    <Icon :class="item.iconColor" :name="item.icon" size="40" />
                    <span :class="item.textColor" class="font-bold">{{
                        item.title
                    }}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Item {
    icon: string;
    path: string;
    title: string;
    iconColor: string;
    textColor: string;
}

defineProps({
    itemLinks: Array as PropType<Item[]>,
});
</script>
