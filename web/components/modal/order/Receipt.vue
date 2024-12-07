<template>
    <div id="receipt" class="flex items-center justify-center">
        <div
            class="bg-white p-6 rounded shadow-md w-[350px] text-xs max-w-md font-mono border border-gray-300"
        >
            <!-- Store Information (Header) -->
            <div class="text-center mb-2 text-black">
                <h1 class="text-lg font-bold">
                    {{ storeName }}
                </h1>
                <p>{{ storeAddress }}</p>
                <p>VAT Registered TIN: {{ vatNumber }}</p>
                <p>MIN: {{ minNumber }}</p>
                <p>SN: {{ serialNumber }}</p>
            </div>

            <!-- POS & Customer Information -->
            <div class="flex justify-between text-black">
                <div>
                    <p>POS {{ posId }}</p>
                    <p>Guest</p>
                </div>
                <div>
                    <p>{{ auth.user.name }}</p>
                </div>
            </div>

            <!-- Itemized List -->
            <table class="w-full mb-2 text-xs text-black">
                <thead>
                    <tr class="border-b border-gray-300">
                        <th class="text-left py-1">Item</th>
                        <th class="text-right py-1">Qty</th>
                        <th class="text-right py-1">Price</th>
                        <th class="text-right py-1">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="i in orderItems"
                        :key="i.id"
                        class="border-b border-gray-300"
                    >
                        <td class="py-1">
                            <span class="break-words overflow-auto">{{
                                i.product.name
                            }}</span>
                        </td>
                        <td class="text-right px-1">
                            {{ i.qty }}
                        </td>
                        <td class="text-right px-1">
                            {{ currencyFormat(i.total_amount / i.qty) }}
                        </td>
                        <td class="text-right px-1">
                            {{ currencyFormat(i.total_amount) }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Subtotals and Discounts -->
            <div class="mb-4 text-black">
                <div class="flex justify-between">
                    <p>Subtotal:</p>
                    <p>{{ currencyFormat(subTotal) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Less 10% discount:</p>
                    <p>{{ currencyFormat(promotionAmount) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Tax 12%:</p>
                    <p>{{ currencyFormat(Number(totalTax)) }}</p>
                </div>
            </div>

            <!-- Total Amount and Payment -->
            <div class="mb-4 font-bold text-black">
                <div class="flex justify-between">
                    <p>Total:</p>
                    <p>
                        {{ currencyFormat(totalAmount) }}
                    </p>
                </div>
                <div class="flex justify-between">
                    <p>Payment Received:</p>
                    <p>{{ currencyFormat(cashTendered) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Change:</p>
                    <p>{{ currencyFormat(change) }}</p>
                </div>
            </div>

            <!-- Sales Information -->
            <!--            <div class="mb-4 space-y-2 text-black"> -->
            <!--                <div class="flex justify-between"> -->
            <!--                    <p>VAT Sales:</p> -->
            <!--                    <p>{{ formatPrice(vatSales) }}</p> -->
            <!--                </div> -->
            <!--                <div class="flex justify-between"> -->
            <!--                    <p>Non-VAT Sales:</p> -->
            <!--                    <p>{{ formatPrice(nonVatSales) }}</p> -->
            <!--                </div> -->
            <!--                <div class="flex justify-between"> -->
            <!--                    <p>Zero-Rated Sales:</p> -->
            <!--                    <p>{{ formatPrice(zeroRatedSales) }}</p> -->
            <!--                </div> -->
            <!--                <div class="flex justify-between"> -->
            <!--                    <p>Total VAT:</p> -->
            <!--                    <p>{{ formatPrice(totalVat) }}</p> -->
            <!--                </div> -->
            <!--            </div> -->

            <!-- Transaction Details -->
            <div class="mb-2 text-black">
                <p>Transaction #:</p>
                <p>Date/Time: {{ date }}</p>
            </div>

            <!-- Footer Message -->
            <div class="border-t text-center pt-4 text-black">
                <p>FOR ONGOING PROMOS</p>
                <p>visit: {{ website }}</p>
                <p class="font-bold">Thank you, please come again!</p>
            </div>

            <!-- Customer Signature Area -->
            <div class="space-y-1 pt-4 text-black">
                <div class="border-b">
                    <p>Customer: {{ customerGuest }}</p>
                </div>
                <div class="border-b">
                    <p>Address:</p>
                </div>
                <div class="border-b">
                    <p>Signature:</p>
                </div>
            </div>

            <!-- Print Button -->
            <div class="mt-6 text-center">
                <Button class="px-4 py-2" @click="printReceipt(customerGuest)">
                    Print Receipt
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeName } from '~/composables/useConstant';
import { printReceipt } from '~/utils/pos';

const auth = useAuth();

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
</script>

<style scoped>
@media print {
    button {
        display: none;
    }
}
</style>
