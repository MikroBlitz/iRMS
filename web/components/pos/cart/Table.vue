<template>
    <div class="relative transition duration-300">
        <div
            v-if="!cartStore.cartItems.length"
            class="text-center flex-col items-center absolute left-0 right-0 top-56"
        >
            <div>
                <Icon
                    name="solar:cart-cross-outline"
                    size="50"
                    class="text-foreground px-6 mt-4"
                />
            </div>
            <span class="font-bold text-xl">Add items</span>
        </div>

        <PosTable>
            <TableHeader v-show="cartStore.cartItems.length">
                <TableRow>
                    <TableHead
                        class="md:w-[480px] h-[50px] text-foreground font-bold"
                    >
                        <span>ITEM</span>
                    </TableHead>
                    <TableHead
                        class="md:w-[200px] text-center h-[50px] text-foreground font-bold"
                    >
                        <span>QTY</span>
                    </TableHead>
                    <TableHead
                        class="text-right md:w-[180px] h-[50px] text-foreground font-bold"
                    >
                        <span>TOTAL</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody v-auto-animate>
                <TableRow
                    v-for="product in products"
                    :key="product.item"
                    class="border-b-0 space-y-1"
                >
                    <TableCell class="font-bold overflow-hidden">
                        <div class="flex items-start gap-2 cursor-default">
                            <div
                                class="flex items-center justify-center space-x-2"
                            >
                                <NuxtImg
                                    :src="product.image || noImage"
                                    class="size-[60px] object-cover rounded"
                                />
                                <div class="flex flex-col">
                                    <div class="text-overflow-hidden">
                                        {{ product.item }}
                                    </div>
                                    <div class="font-medium">
                                        {{ currencyFormat(product.price) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell class="flex items-center justify-center">
                        <div class="mt-1.5">
                            <NumberField
                                :default-value="product.qty"
                                :min="0"
                                class="w-[130px]"
                            >
                                <NumberFieldContent>
                                    <div class="pb-1">
                                        <template v-if="product.qty > 1">
                                            <NumberFieldDecrement
                                                @click.prevent="
                                                    cartStore.updateQuantity(
                                                        product,
                                                        -1,
                                                    )
                                                "
                                            />
                                        </template>
                                        <template v-else>
                                            <span
                                                :class="
                                                    cn(
                                                        'absolute top-1/2 -translate-y-1/2 left-0 p-3',
                                                    )
                                                "
                                                @click="
                                                    () =>
                                                        cartStore.deleteCartItem(
                                                            product.item,
                                                        )
                                                "
                                            >
                                                <Icon
                                                    name="solar:trash-bin-2-bold"
                                                    size="1.8rem"
                                                    class="text-destructive cursor-pointer"
                                                />
                                            </span>
                                        </template>
                                        <NumberFieldInput
                                            class="font-bold"
                                            :value="product.qty"
                                            @input="
                                                cartStore.onQuantityInput(
                                                    $event,
                                                    product,
                                                )
                                            "
                                        />
                                        <NumberFieldIncrement
                                            @click.prevent="
                                                cartStore.updateQuantity(
                                                    product,
                                                    1,
                                                )
                                            "
                                        />
                                    </div>
                                </NumberFieldContent>
                            </NumberField>
                        </div>
                    </TableCell>
                    <TableCell class="text-right">
                        <span class="font-bold">{{
                            currencyFormat(product.amount)
                        }}</span>
                    </TableCell>
                </TableRow>
            </TableBody>
        </PosTable>
    </div>
</template>

<script setup lang="ts">
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import type { CartProduct } from '~/types';

import { cn } from '~/lib/utils';
import { useCart } from '~/stores/useCart';
import { currencyFormat } from '~/utils/pos';

const cartStore = useCart();

defineProps({
    products: Array as PropType<CartProduct[]>,
});
</script>
