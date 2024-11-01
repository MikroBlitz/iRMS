<template>
    <div class="relative">
        <div
            v-if="!cartStore.cartItems.length"
            class="text-center flex-col items-center absolute left-0 right-0 top-64"
        >
            <div>
                <Icon
                    name="mdi-cart-off"
                    size="50"
                    class="text-foreground px-6 mt-4"
                />
            </div>
            <span class="font-bold text-xl">Add items to cart</span>
        </div>

        <PosTable>
            <TableHeader>
                <TableRow>
                    <TableHead class="md:w-[480px]">
                        <strong>ITEM</strong>
                    </TableHead>
                    <TableHead class="md:w-[200px] text-center">
                        <strong>QTY</strong>
                    </TableHead>
                    <TableHead class="text-right md:w-[180px]">
                        <strong>TOTAL</strong>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody v-auto-animate>
                <TableRow v-for="product in products" :key="product.item">
                    <TableCell
                        class="font-bold overflow-hidden transition duration-300"
                    >
                        <div class="flex items-center gap-2">
                            <span
                                class="flex items-center cursor-pointer"
                                @click="
                                    () => cartStore.deleteCartItem(product.item)
                                "
                            >
                                <Icon
                                    name="mdi:remove"
                                    size="1.5rem"
                                    class="text-red-700 ml"
                                />
                            </span>
                            <div class="flex flex-col">
                                <div class="text-overflow-hidden">
                                    {{ product.item }}
                                </div>
                                <div class="font-medium">
                                    {{ currencyFormat(product.price) }}
                                </div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <NumberField :default-value="product.qty" :min="0">
                            <NumberFieldContent>
                                <NumberFieldDecrement
                                    @click.prevent="
                                        cartStore.updateQuantity(product, -1)
                                    "
                                />
                                <NumberFieldInput
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
                                        cartStore.updateQuantity(product, 1)
                                    "
                                />
                            </NumberFieldContent>
                        </NumberField>
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
import { currencyFormat } from '~/utils/pos';
import { useCart } from '~/stores/useCart';
import type { CartProduct } from '~/types';

const cartStore = useCart();

defineProps({
    products: Array as PropType<CartProduct[]>,
});
</script>
