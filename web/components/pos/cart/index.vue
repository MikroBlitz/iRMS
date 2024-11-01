<template>
    <div
        class="relative max-w-7xl md:min-w-[550px] border-2 rounded-md border-secondary dark:border-primary p-0.5 flex flex-col"
    >
        <div>
            <PosCartHeader />
        </div>

        <div class="flex-grow overflow-y-auto mb-1 min-h-[500px] max-h-[578px]">
            <PosCartTable :products="cartStore.cartItems" class="w-full" />
        </div>

        <div :class="{ 'absolute bottom-0 left-0 right-0 z-10': !isMobile }">
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
