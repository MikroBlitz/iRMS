<template>
    <div
        class="flex items-center md:justify-start justify-center flex-wrap gap-2 p-4"
    >
        <div v-for="item in itemLinks" :key="item.title">
            <NuxtLink
                :to="item.path"
                class="p-4 px-6 hover:bg-accent transition duration-300 rounded flex items-center gap-2 bg-secondary dark:bg-primary dark:hover:bg-accent w-[300px]"
            >
                <Icon :class="item.iconColor" :name="item.icon" size="40" />
                <span :class="item.textColor">{{ item.title }}</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    itemLinks: {
        items: Object,
        required: true,
        type: Array,
    },
});
</script>
