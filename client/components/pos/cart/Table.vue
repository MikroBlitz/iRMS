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
                    <TableCell class="font-bold overflow-hidden transition duration-300">
                        <div class="flex items-center gap-2">
                            <span
                                class="flex items-center cursor-pointer"
                                @click="() => cartStore.deleteCartItem(product.item)"
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
                        <NumberField :default-value="product.qty" :min="1">
                            <NumberFieldContent>
                                <NumberFieldDecrement
                                    @click.prevent="updateQuantity(product, -1)"
                                />
                                <NumberFieldInput
                                    :value="product.qty"
                                    @input="onQuantityInput($event, product)"
                                />
                                <NumberFieldIncrement
                                    @click.prevent="updateQuantity(product, 1)"
                                />
                            </NumberFieldContent>
                        </NumberField>
                    </TableCell>
                    <TableCell class="text-right">
                        <span class="font-bold">{{ currencyFormat(product.amount) }}</span>
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

const cartStore = useCart();

defineProps({
    products: Array,
});

// Update quantity by a fixed increment (like -1 or +1)
const updateQuantity = (product: any, change: number) => {
    if (product.qty + change >= 1 && product.qty + change <= product.stock) {
        product.qty += change;
        product.amount = product.qty * product.price;
        cartStore.updateCartItem(product);
    } else if (product.qty + change > product.stock) {
        toasts('Sorry, that is the maximum quantity available!', {
            type: 'warning',
        });
    }
};

// Handle manual input of quantity
const onQuantityInput = (event: Event, product: any) => {
    const input = parseInt((event.target as HTMLInputElement).value, 10);

    if (!isNaN(input) && input >= 1 && input <= product.stock) {
        // Update quantity and total amount if input is valid and not zero
        product.qty = input;
        product.amount = product.qty * product.price;
        cartStore.updateCartItem(product);
    } else if (input > product.stock) {
        toasts('Sorry, that is the maximum quantity available!', {
            type: 'warning',
        });
    } else {
        // Reset to minimum quantity if the input is invalid or below 1
        product.qty = 1;
        product.amount = product.qty * product.price;
    }
};
</script>
