<template>
    <div class="m-auto bg-secondary px-4 py-1">
        <div
            class="flex flex-col text-foreground text-sm font-medium"
            :class="{ 'opacity-5': !cartStore.totalAmount }"
        >
            <div class="flex justify-between items-center font-bold">
                <div>Base Total</div>
                <div>{{ currencyFormat(cartStore.totalAmount) }}</div>
            </div>
            <div class="flex justify-between items-center text-foreground">
                <div>Promotions</div>
                <div>- {{ currencyFormat(cartStore.promotionAmount) }}</div>
            </div>
            <div class="flex justify-between items-center">
                <div>Taxes</div>
                <div>{{ currencyFormat(cartStore.totalTax) }}</div>
            </div>
            <div
                class="flex justify-between items-center text-2xl font-bold border-y-2 border-primary"
            >
                <div>Checkout</div>
                <div>
                    {{
                        currencyFormat(cartStore.totalAmountWithTaxAndDiscount)
                    }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/useCart';

const cartStore = useCart();
</script>
