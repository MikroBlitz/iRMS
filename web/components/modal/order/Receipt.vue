<template>
    <PosViewReceipt
        :id="id"
        :cash-tendered="cashTendered"
        :change="change"
        :customer-guest="customerGuest"
        :date="date"
        :order-items="orderItems"
        :promotion-amount="promotionAmount"
        :sub-total="subTotal"
        :total-amount="totalAmount"
        :total-tax="totalTax"
        :transaction-number="transactionNumber"
    />
</template>

<script setup lang="ts">
const props: any = defineProps({
    cashTendered: {
        default: '',
        type: Number,
    },
    change: {
        default: '',
        type: Number,
    },
    customerGuest: {
        default: '',
        type: String,
    },
    date: {
        default: '',
        type: String,
    },
    id: {
        default: '',
        type: Number,
    },
    orderItems: {
        default: () => [],
        type: Array as PropType<any[]>,
    },
    totalAmount: {
        default: '',
        type: Number,
    },
    transactionNumber: {
        default: '',
        type: String,
    },
});

const taxRate = 12 / 100; // 12% tax rate
const discountRate = 10 / 100; // 10% discount rate
const subTotal = computed(() => {
    return props.orderItems.reduce((total: number, item: any) => {
        return total + item.total_amount;
    }, 0);
});
const totalTax = computed(() => subTotal.value * taxRate);
const promotionAmount = computed(() => subTotal.value * discountRate);

console.log(promotionAmount.value);
</script>
