<template>
    <div class="m-auto bg-secondary px-6 py-1 shadow-md">
        <div
            class="flex flex-col text-foreground text-sm font-medium"
            :class="{ 'opacity-50': !cartStore.totalAmount }"
        >
            <div class="flex justify-between items-center">
                <span class="font-semibold text-lg">Base Total</span>
                <strong>{{ currencyFormat(cartStore.totalAmount) }}</strong>
            </div>

            <div
                class="flex justify-between items-center text-emerald-700 dark:text-emerald-500"
            >
                <span class="font-semibold">Promotions</span>
                <span>- {{ currencyFormat(cartStore.promotionAmount) }}</span>
            </div>

            <div
                class="flex justify-between items-center text-destructive dark:text-red-500"
            >
                <span class="font-semibold">Taxes</span>
                <span>{{ currencyFormat(cartStore.totalTax) }}</span>
            </div>

            <div
                class="flex justify-between items-center text-xl font-bold border-t-2 pt-1 border-primary"
            >
                <span>Checkout</span>
                <span>
                    {{
                        currencyFormat(cartStore.totalAmountWithTaxAndDiscount)
                    }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/useCart';

const cartStore = useCart();
</script>
