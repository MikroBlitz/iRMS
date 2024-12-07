<template>
    <div
        v-for="product in filteredItems"
        :key="product.id"
        :class="
            !product.inventories[inventoryLocation]?.qty
                ? 'cursor-not-allowed pointer-events-none'
                : ''
        "
        class="relative flex rounded bg-card border-2 border-secondary p-3 h-[60px] w-full font-medium overflow-hidden"
        @click="cartStore.addProductToCart(product)"
    >
        <div
            class="absolute top-3 right-14 flex items-center justify-center gap-1 text-white text-sm bg-red-500 dark:bg-red-800 p-2 rounded-lg"
            :class="
                !product.inventories[inventoryLocation]?.qty ? '' : 'hidden'
            "
        >
            <Icon name="mdi:warning" size="20" />
            Not in stock
        </div>
        <div
            :class="
                !product.inventories[inventoryLocation]?.qty ? 'opacity-20' : ''
            "
            class="flex items-center justify-between rounded-b-md w-full bg-card"
        >
            <NuxtImg
                :src="product.image || noImage"
                class="size-[50px] mr-3 object-cover rounded"
            />
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
                                : 'animate-pulse text-destructive'
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
                class="text-sm flex items-center space-x-1 justify-center bg-gray-500/20 p-1 rounded-full"
                :class="
                    product.inventories[inventoryLocation]?.qty > restockQty
                        ? ''
                        : 'text-destructive animate-pulse'
                "
            >
                <Icon name="solar:box-minimalistic-linear" size="20" />
                <span class="text-xs font-medium text-foreground/70">{{
                    product.inventories[inventoryLocation]?.qty
                }}</span>
            </div>
        </div>

        <!-- Cart icon (hidden by default) -->
        <div
            class="absolute cursor-pointer inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 hover:bg-foreground/50 rounded"
        >
            <div class="flex items-center justify-center">
                <Icon
                    name="solar:add-circle-bold"
                    size="50"
                    class="text-background"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/useCart';

const cartStore = useCart();

// TODO: fix types
const restockQty: any = inject('restockQty');
const inventoryLocation: any = inject('inventoryLocation');

const filteredItems: any = inject('filteredItems');
</script>
