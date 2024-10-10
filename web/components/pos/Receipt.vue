<template>
    <div id="receipt" class="min-h-screen flex items-center justify-center">
        <div
            class="bg-white p-6 rounded shadow-md w-full text-xs max-w-md font-mono border border-gray-300"
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
                    <p>{{ customerType }}</p>
                </div>
                <div>
                    <p>{{ auth.user.name }}</p>
                </div>
            </div>

            <!-- Itemized List -->
            <table class="w-full mb-4 text-black">
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
                        v-for="i in cartStore.cartItems"
                        :key="i.id"
                        class="border-b border-gray-300"
                    >
                        <td class="py-1">
                            {{ i.item }}
                        </td>
                        <td class="text-right py-1">
                            {{ i.qty }}
                        </td>
                        <td class="text-right py-1">
                            {{ formatPrice(i.price) }}
                        </td>
                        <td class="text-right py-1">
                            {{ formatPrice(i.amount) }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Subtotals and Discounts -->
            <div class="mb-4 space-y-1 text-black">
                <div class="flex justify-between">
                    <p>Subtotal:</p>
                    <p>{{ currencyFormat(cartStore.totalAmount) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Less 10% discount:</p>
                    <p>{{ currencyFormat(cartStore.promotionAmount) }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Tax 12%:</p>
                    <p>{{ currencyFormat(cartStore.totalTax) }}</p>
                </div>
            </div>

            <!-- Total Amount and Payment -->
            <div class="mb-4 font-bold text-black">
                <div class="flex justify-between">
                    <p>Total:</p>
                    <p>
                        {{
                            currencyFormat(
                                cartStore.totalAmountWithTaxAndDiscount,
                            )
                        }}
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
                <p>Transaction #: {{ transactionNumber }}</p>
                <p>Date/Time: {{ transactionDate }}</p>
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
                    <p>Customer: {{ customerName }}</p>
                </div>
                <div class="border-b">
                    <p>Address: {{ customerAddress }}</p>
                </div>
                <div class="border-b">
                    <p>Signature:</p>
                </div>
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
import { useCart } from '~/stores/useCart';

const auth = useAuth();
const cartStore = useCart();
const customerName = inject('customerName');
const customerAddress = ref('');
const customerType = ref('Guest');

const date = new Date();
const toISOString = (date: Date) =>
    date.toISOString().slice(0, 19).replace('T', ' ');
const transactionDate = toISOString(date);

const cashTendered: any = inject('cashTendered');

const change: ComputedRef<number> = computed(() =>
    parseFloat(
        (cashTendered.value - cartStore.totalAmountWithTaxAndDiscount).toFixed(
            2,
        ),
    ),
);

const storeName = ref('Shop Name');
const storeAddress = ref('Store Address');
const vatNumber = ref('000-000-000-000');
const minNumber = ref('123456789');
const serialNumber = ref('AB98765XYZ');
const posId = ref('001');
const transactionNumber = ref('00000000001');
const website = ref('www.website.com');

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

// const vatSales = ref(0.0);
// const nonVatSales = ref(0.0);
// const zeroRatedSales = ref(0.0);
// const totalVat = ref(0.0);

const printReceipt = () => {
    // const receiptElement = document.getElementById('receipt').innerHTML;
    // const originalContent = document.body.innerHTML;
    // document.body.innerHTML = receiptElement;
    // window.print();
    // document.body.innerHTML = originalContent;
    alert('Printing not supported yet');
};
</script>

<style scoped>
@media print {
    button {
        display: none;
    }
}
</style>
