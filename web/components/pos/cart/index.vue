<template>
    <div
        class="relative max-w-7xl md:min-w-[650px] border-2 rounded-md border-secondary dark:border-primary p-0.5 flex flex-col h-full"
    >
        <div>
            <PosCartHeader />
        </div>

        <div
            class="flex-grow overflow-y-auto border-b"
            style="max-height: calc(100vh - 12rem)"
        >
            <PosCartTable :products="cartStore.cartItems" class="w-full" />
        </div>

        <div :class="{ 'sticky bottom-0 left-0 right-0 z-10': !isMobile }">
            <PosCartTotal />
            <PosCartAction />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/useCart';

const isMobile = inject('isMobile');
const cartStore = useCart();
</script>
