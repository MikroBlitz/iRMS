<template>
    <div
        v-for="product in filteredItems"
        :key="product.id"
        :class="
            !product.inventories[inventoryLocation]?.qty
                ? 'cursor-not-allowed pointer-events-none'
                : ''
        "
        class="relative rounded bg-card border-2 border-secondary p-1 flex-grow size-[130px] md:size-[190px] max-w-[250px] pb-1 font-medium overflow-hidden"
        @click="cartStore.addProductToCart(product)"
    >
        <div
            class="flex items-center justify-center gap-1 text-white text-sm bg-destructive/70 p-2 rounded"
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
        >
            <div class="flex m-auto items-center justify-center">
                <div
                    :hidden="
                        product.inventories[inventoryLocation]?.qty < 1 ||
                        product.inventories[inventoryLocation]?.qty > restockQty
                    "
                    class="text-destructive"
                >
                    <Icon
                        name="mdi:warning-circle"
                        class="animate-ping absolute top-2 right-3"
                        size="25"
                    />
                </div>
                <NuxtImg
                    alt="prod-image"
                    :src="product.image || noImage"
                    class="rounded h-[68px] md:h-32 w-auto object-cover"
                />
            </div>

            <div
                class="border-t-2 border-secondary flex items-center justify-between absolute bottom-0 left-0 rounded-b-md w-full py-1 px-3 bg-card"
            >
                <div class="flex-1 overflow-hidden">
                    <div
                        class="text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                    >
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
    </div>
</template>

<script setup lang="ts">
import { noImage } from '~/composables/useConstant';
import { useCart } from '~/stores/useCart';

const cartStore = useCart();

// TODO: fix types
const restockQty: any = inject('restockQty');
const inventoryLocation: any = inject('inventoryLocation');

const filteredItems: any = inject('filteredItems');
</script>
