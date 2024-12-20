<template>
    <PosViewReceipt
        :id="cartStore.id"
        :cash-tendered="cashTendered"
        :change="change"
        :customer-guest="customerName"
        :date="transactionDate"
        :order-items="cartStore.cartItems"
        :promotion-amount="cartStore.promotionAmount"
        :sub-total="cartStore.totalAmount"
        :total-amount="cartStore.totalAmountWithTaxAndDiscount"
        :total-tax="cartStore.totalTax"
        :transaction-number="generateTransactionId"
    />
</template>

<script setup lang="ts">
const cartStore: any = useCart();
const customerName: any = inject('customerName');

const transactionDate = toBasicDateTime(new Date());

const cashTendered: any = inject('cashTendered');
const change: ComputedRef<number> = computed(() =>
    parseFloat(
        (cashTendered.value - cartStore.totalAmountWithTaxAndDiscount).toFixed(
            2,
        ),
    ),
);
</script>
