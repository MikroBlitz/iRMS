<template>
    <div class="p-2">
        <div v-if="loading">
            <div
                class="animate-pulse relative w-full min-w-[350px] md:w-[280px] xl:w-[450px] p-6 rounded border-2 border-secondary flex-col"
            >
                <Skeleton class="h-3 w-1/2 mb-1 bg-secondary" />
                <Skeleton class="h-5 w-3/4 mb-2 bg-secondary" />
                <div class="flex items-start justify-between">
                    <Skeleton class="size-8 rounded-full bg-secondary" />
                </div>
                <Skeleton class="h-[2px] w-full mt-3 bg-secondary" />
            </div>
        </div>

        <div
            v-else
            :class="color"
            class="w-full min-w-[350px] p-8 rounded flex-col"
        >
            <div class="flex items-start justify-between">
                <div>
                    <div class="text-sm text-foreground font-medium">
                        {{ title }}
                    </div>
                    <div class="text-xl xl:text-3xl font-bold">
                        {{ value }}
                    </div>
                </div>
                <Icon :name="icon" :size="size" />
            </div>
            <div class="border-b-2 mt-4" :class="borderColor" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    borderColor: {
        default: 'border-blue-300 dark:border-blue-500',
        type: String,
    },
    color: {
        default: 'bg-blue-100 dark:bg-blue-900',
        type: String,
    },
    icon: {
        required: true,
        type: String,
    },
    loading: {
        default: false,
        type: Boolean,
    },
    size: {
        default: '30',
        type: String,
    },
    title: {
        required: true,
        type: String,
    },
    value: {
        default: 0,
        required: true,
        type: [Number, String],
    },
});
</script>
