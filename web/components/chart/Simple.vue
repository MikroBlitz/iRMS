<template>
    <div
        :class="color"
        class="w-full md:w-[280px] xl:w-[400px] p-8 rounded-xl flex-col"
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
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: [Number, String],
        required: true,
        default: 0,
    },
    icon: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: '30',
    },
    color: {
        type: String,
        default: 'bg-blue-100 dark:bg-blue-900',
    },
    borderColor: {
        type: String,
        default: 'border-blue-300 dark:border-blue-500',
    },
});
</script>
