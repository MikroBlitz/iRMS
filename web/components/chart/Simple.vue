<template>
    <div class="p-2">
        <div
            v-if="loading"
            class="w-full min-w-[350px] p-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] animate-pulse"
        >
            <Skeleton class="h-3 w-1/2 mb-1 bg-[hsl(var(--muted))]" />
            <Skeleton class="h-5 w-3/4 mb-2 bg-[hsl(var(--muted))]" />
            <div class="flex items-start justify-between">
                <Skeleton class="size-8 rounded-full bg-[hsl(var(--muted))]" />
            </div>
            <Skeleton class="h-[2px] w-full mt-3 bg-[hsl(var(--muted))]" />
        </div>

        <div
            v-else
            class="w-full min-w-[350px] p-8 rounded-2xl flex flex-col bg-[hsl(var(--card))] border border-[hsl(var(--border))] transition duration-300 hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.5)] cursor-pointer"
        >
            <div class="flex items-start justify-between">
                <div>
                    <div
                        class="text-sm text-[hsl(var(--muted-foreground))] font-medium"
                    >
                        {{ title }}
                    </div>
                    <div
                        class="text-xl xl:text-3xl text-[hsl(var(--foreground))]"
                    >
                        {{ value }}
                    </div>
                </div>
                <Icon
                    :name="icon"
                    :size="size"
                    class="text-[hsl(var(--primary))]"
                />
            </div>
            <div class="border-b-2 mt-4 border-[hsl(var(--border))]" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
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

<style scoped>
@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>
