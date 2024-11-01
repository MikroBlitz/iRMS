<template>
    <div
        v-for="product in filteredItems"
        :key="product.id"
        :class="
            !product.inventories[inventoryLocation]?.qty
                ? 'cursor-not-allowed pointer-events-none'
                : ''
        "
        class="relative flex rounded bg-card border-2 border-secondary px-4 py-3 h-[60px] w-full font-medium overflow-hidden"
        @click="cartStore.addProductToCart(product)"
    >
        <div
            class="absolute top-3 right-14 flex items-center justify-center gap-1 text-white text-sm bg-red-500 dark:bg-red-800 p-2 rounded-full"
            :class="
                !product.inventories[inventoryLocation]?.qty ? '' : 'hidden'
            "
        >
            <Icon name="mdi:warning" size="20" />
            Out of stock
        </div>
        <div
            :class="
                !product.inventories[inventoryLocation]?.qty ? 'opacity-20' : ''
            "
            class="flex items-center justify-between rounded-b-md w-full bg-card"
        >
            <div class="flex-1 overflow-hidden">
                <div
                    :class="
                        product.inventories[inventoryLocation]?.qty > restockQty
                            ? ''
                            : 'animate-pulse'
                    "
                    class="text-md flex items-center gap-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    <Icon
                        :class="
                            product.inventories[inventoryLocation]?.qty >
                            restockQty
                                ? 'hidden'
                                : 'animate-pulse text-red-500'
                        "
                        name="mdi:warning"
                        size="20"
                    />
                    {{ product.name }}
                </div>
                <div
                    class="text-sm md:text-[1rem] text-green-600 dark:text-green-400"
                >
                    {{ currencyFormat(product.price) }}
                </div>
            </div>
            <div
                class="text-sm flex items-end justify-center"
                :class="
                    product.inventories[inventoryLocation]?.qty > restockQty
                        ? ''
                        : 'text-red-500 animate-pulse'
                "
            >
                <Icon
                    name="mdi:package-variant-closed"
                    size="25"
                    class="-mb-1"
                />
                <span class="text-sm font-medium text-gray-500">{{
                    product.inventories[inventoryLocation]?.qty
                }}</span>
            </div>
        </div>

        <!-- Cart icon (hidden by default) -->
        <div
            class="absolute cursor-pointer inset-0 flex justify-center items-center transition duration-300 opacity-0 hover:opacity-100 transition-opacity hover:bg-black/50 rounded"
        >
            <Icon name="mdi:cart-arrow-down" size="30" class="text-green-600" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/useCart';

const cartStore = useCart();

// TODO: fix types
const restockQty: any = inject('restockQty');
const inventoryLocation: any = inject('inventoryLocation');

const filteredItems = inject('filteredItems');
</script>
