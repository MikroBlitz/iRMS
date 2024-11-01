<template>
    <div
        class="flex flex-col m-auto items-end bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded"
    >
        <p class="text-black dark:text-gray-300 text-sm font-medium">
            Taxable Amount: <strong>₱ {{ currencyFormat(totalAmount) }}</strong>
        </p>
        <p class="text-black dark:text-gray-300 text-sm font-medium">
            Tax (12%): <strong>₱ {{ currencyFormat(totalTax) }}</strong>
        </p>
        <p class="text-black dark:text-gray-300 text-sm font-medium">
            Promo Code: <strong>{{ promoCode }}</strong>
        </p>
        <p class="text-black dark:text-gray-300 text-sm font-medium">
            Discount: <strong>{{ discount }}%</strong>
        </p>
    </div>
</template>

<script setup lang="ts">
const totalAmount = computed(() => {
    return cartProducts.value.reduce(
        (total, item) => total + (item.amount ?? 0),
        0,
    );
});

const totalTax = computed(() => {
    return totalAmount.value * 0.12; // 12% tax
});
const promoCode = ref('GamingDev');
const discount = ref(20);
</script>
