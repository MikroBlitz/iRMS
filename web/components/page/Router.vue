<template>
    <div class="p-2 space-y-4 pb-8">
        <div
            class="relative h-0.5 w-full overflow-hidden rounded-full bg-[hsl(var(--muted))]"
        >
            <div class="absolute inset-y-0 left-0 w-full bg-secondary" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <div
                v-for="item in itemLinks"
                :key="item.title"
                class="group relative"
            >
                <NuxtLink
                    :to="item.path"
                    class="relative flex items-center gap-4 p-6 rounded-2xl bg-[hsl(var(--card))] backdrop-blur-sm border border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)] transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-lg group-hover:shadow-[hsl(var(--primary)/0.5)]"
                >
                    <div class="relative">
                        <div
                            class="absolute inset-0 bg-current rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity"
                            :class="item.iconColor"
                        />

                        <Icon
                            :name="item.icon"
                            size="40"
                            class="relative transform transition duration-300 group-hover:scale-110 group-hover:rotate-3"
                            :class="item.iconColor"
                        />
                    </div>

                    <span
                        class="font-medium text-lg transition-colors"
                        :class="item.textColor"
                    >
                        {{ item.title }}
                    </span>

                    <Icon
                        name="solar:double-alt-arrow-right-outline"
                        class="ml-auto opacity-0 transform translate-x-2 transition-all duration-300 text-[hsl(var(--muted-foreground))] group-hover:opacity-100 group-hover:translate-x-0"
                        size="30"
                    />
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
    itemLinks: {
        required: true,
        type: Array as PropType<Item[]>,
    },
});
</script>

<style scoped>
@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}
</style>
