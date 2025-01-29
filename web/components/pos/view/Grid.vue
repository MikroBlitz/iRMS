<template>
    <div
        v-for="product in filteredItems"
        :key="product.id"
        :class="
            !product.inventories[inventoryLocation]?.qty
                ? 'cursor-not-allowed pointer-events-none opacity-50'
                : ''
        "
        class="relative rounded bg-[hsl(var(--card))] border border-[hsl(var(--border))] flex-grow size-[130px] md:size-[190px] max-w-[250px] pb-2 font-medium overflow-hidden transition duration-300 hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.5)] cursor-pointer"
        @click="cartStore.addProductToCart(product)"
    >
        <div
            v-if="!product.inventories[inventoryLocation]?.qty"
            class="flex items-center justify-center gap-1 text-white text-sm bg-[hsl(var(--destructive)/0.7)] p-2 rounded-md"
        >
            <Icon name="mdi:warning" size="20" />
            Not in stock
        </div>
        <div
            :class="
                !product.inventories[inventoryLocation]?.qty ? 'opacity-20' : ''
            "
        >
            <div class="flex m-auto items-center justify-center relative">
                <Icon
                    v-if="
                        product.inventories[inventoryLocation]?.qty < 1 ||
                        product.inventories[inventoryLocation]?.qty > restockQty
                    "
                    name="mdi:warning-circle"
                    class="animate-ping absolute top-0.5 right-0.5 text-[hsl(var(--destructive))]"
                    size="25"
                />
                <NuxtImg
                    alt="prod-image"
                    :src="product.image || noImage"
                    class="rounded h-[68px] md:h-32 w-auto object-contain"
                />
            </div>

            <div
                class="border-t border-[hsl(var(--border))] flex items-center justify-between absolute bottom-0 left-0 rounded-b-xl w-full py-2 px-3 bg-[hsl(var(--card))]"
            >
                <div class="flex-1 overflow-hidden">
                    <div
                        class="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-[hsl(var(--foreground))]"
                    >
                        {{ product.name }}
                    </div>
                    <div
                        class="text-sm md:text-[1rem] text-emerald-700 dark:text-emerald-500"
                    >
                        {{ currencyFormat(product.price) }}
                    </div>
                </div>
                <div
                    class="text-sm flex items-center space-x-1 justify-center bg-[hsl(var(--muted))] p-1 rounded-full"
                    :class="
                        product.inventories[inventoryLocation]?.qty > restockQty
                            ? ''
                            : 'text-[hsl(var(--destructive))] animate-pulse'
                    "
                >
                    <Icon name="solar:box-minimalistic-linear" size="20" />
                    <span
                        class="text-xs font-medium text-[hsl(var(--muted-foreground))]"
                    >
                        {{ product.inventories[inventoryLocation]?.qty }}
                    </span>
                </div>
            </div>

            <div
                class="absolute cursor-pointer inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 hover:bg-[hsl(var(--foreground)/0.5)]"
            >
                <div class="flex items-center justify-center">
                    <Icon
                        name="solar:add-circle-bold"
                        size="50"
                        class="text-[hsl(var(--background))]"
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

const restockQty: any = inject('restockQty');
const inventoryLocation: any = inject('inventoryLocation');

const filteredItems: any = inject('filteredItems');
</script>
