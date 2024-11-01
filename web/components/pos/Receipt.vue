<template>
    <div id="receipt" class="min-h-screen flex items-center justify-center">
        <div
            class="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-sm font-mono border border-gray-300"
        >
            <!-- Store Information (Header) -->
            <div class="text-center mb-4 text-black">
                <h1 class="text-lg font-bold">
                    {{ storeName }}
                </h1>
                <p>{{ storeAddress }}</p>
                <p>VAT Registered TIN: {{ vatNumber }}</p>
                <p>MIN: {{ minNumber }}</p>
                <p>SN: {{ serialNumber }}</p>
            </div>

            <!-- POS & Customer Information -->
            <div class="flex justify-between mb-4 text-black">
                <div>
                    <p>POS {{ posId }}</p>
                    <p>{{ customerType }}</p>
                </div>
                <div>
                    <p>{{ cashierName }}</p>
                </div>
            </div>

            <!-- Itemized List -->
            <table class="w-full text-sm mb-4 text-black">
                <thead>
                    <tr class="border-b border-gray-300">
                        <th class="text-left py-2">Item</th>
                        <th class="text-right py-2">Qty</th>
                        <th class="text-right py-2">Price</th>
                        <th class="text-right py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in items"
                        :key="item.id"
                        class="border-b border-gray-300"
                    >
                        <td class="py-2">
                            {{ item.name }}
                        </td>
                        <td class="text-right py-2">
                            {{ item.quantity }}
                        </td>
                        <td class="text-right py-2">
                            {{ formatPrice(item.price) }}
                        </td>
                        <td class="text-right py-2">
                            {{ formatPrice(item.total) }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Subtotals and Discounts -->
            <div class="mb-4 space-y-2 text-black">
                <div class="flex justify-between">
                    <p>Subtotal:</p>
                    <p>{{ formatPrice(subtotal) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Less 12% VAT:</p>
                    <p>{{ formatPrice(vatAmount) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Less 20% SC Discount:</p>
                    <p>{{ formatPrice(discount) }}</p>
                </div>
            </div>

            <!-- Total Amount and Payment -->
            <div class="mb-4 font-bold text-black">
                <div class="flex justify-between">
                    <p>Total:</p>
                    <p>{{ formatPrice(totalAmount) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Payment Received:</p>
                    <p>{{ formatPrice(paymentReceived) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Change:</p>
                    <p>{{ formatPrice(change) }}</p>
                </div>
            </div>

            <!-- Sales Information -->
            <div class="mb-4 space-y-2 text-black">
                <div class="flex justify-between">
                    <p>VAT Sales:</p>
                    <p>{{ formatPrice(vatSales) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Non-VAT Sales:</p>
                    <p>{{ formatPrice(nonVatSales) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Zero-Rated Sales:</p>
                    <p>{{ formatPrice(zeroRatedSales) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Total VAT:</p>
                    <p>{{ formatPrice(totalVat) }}</p>
                </div>
            </div>

            <!-- Transaction Details -->
            <div class="mb-4 text-black">
                <p>Transaction #: {{ transactionNumber }}</p>
                <p>Date/Time: {{ transactionDate }}</p>
            </div>

            <!-- Footer Message -->
            <div class="text-center text-xs mt-6 text-black">
                <p>FOR ONGOING PROMOS</p>
                <p>Visit: {{ website }}</p>
                <p>Thank you, please come again!</p>
            </div>

            <!-- Customer Signature Area -->
            <div class="border-t border-gray-300 mt-6 text-xs pt-4 text-black">
                <p>Customer: ___________________________</p>
                <p>Address: ___________________________</p>
                <p>TIN: ___________________________</p>
                <p>SC ID No.: ___________________________</p>
                <p>Signature: ___________________________</p>
            </div>

            <!-- Print Button -->
            <div class="mt-6 text-center">
                <button
                    class="bg-blue-500 text-white px-4 py-2 rounded shadow"
                    @click="printReceipt"
                >
                    Print Receipt
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const storeName = ref('Shop Name');
const storeAddress = ref('Store Address');
const vatNumber = ref('000-000-000-000');
const minNumber = ref('123456789');
const serialNumber = ref('AB98765XYZ');
const posId = ref('001');
const customerType = ref('Guest');
const cashierName = ref('Louie Corpin');
const transactionNumber = ref('00000000001');
const transactionDate = ref('10/25/2019 09:05:42');
const website = ref('www.xyzgeneral.com');

const items = reactive([
    {
        id: 1,
        name: 'Del Monte Fruit Cocktail 825g',
        quantity: 1,
        price: 99.75,
        total: 99.75,
    },
    {
        id: 2,
        name: 'Argentina C/Beef 150g',
        quantity: 1,
        price: 30.25,
        total: 30.25,
    },
    {
        id: 3,
        name: 'Ambroxol Tab 75mg',
        quantity: 2,
        price: 22.0,
        total: 44.0,
    },
]);

const subtotal = ref(161.45);
const vatAmount = ref(4.71);
const discount = ref(7.86);
const totalAmount = ref(161.45);
const paymentReceived = ref(200.0);
const change = ref(38.55);
const vatSales = ref(116.09);
const nonVatSales = ref(31.43);
const zeroRatedSales = ref(0.0);
const totalVat = ref(13.93);

const printReceipt = () => {
    const receiptElement = document.getElementById('receipt').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = receiptElement;
    window.print();
    document.body.innerHTML = originalContent;
};
</script>

<style scoped>
@media print {
    button {
        display: none;
    }
}
</style>
