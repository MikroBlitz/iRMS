<template>
    <div
        class="max-w-7xl w-full p-0.5 flex-grow overflow-hidden border-2 rounded-md border-primary/60 dark:border-primary"
    >
        <PosProductHeader
            class="mb-0.5"
            :toggle-view="toggleView"
            :name="isGridView ? 'mdi:view-list' : 'mdi:view-grid'"
        />

        <template v-if="isLoading">
            <div class="flex-col flex mt-80 justify-center items-center">
                <SpinnerBlocksWave class="size-20" />
                <p class="animate-pulse text-foreground mt-2 text-xl">
                    Fetching Items...
                </p>
            </div>
        </template>

        <div
            v-else
            v-auto-animate
            class="flex-wrap flex gap-0.5 w-full overflow-y-auto"
            style="max-height: calc(100vh - 11rem)"
        >
            <PosViewGrid v-if="isGridView" :products="products" />
            <PosViewList v-else :products="products" />
        </div>
    </div>
</template>

<script setup lang="ts">
const isGridView = ref(true);
const toggleView = () => {
    isGridView.value = !isGridView.value;
};

const isLoading = inject('isLoading');
const products = inject('products');
</script>
