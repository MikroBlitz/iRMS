<template>
    <div
        v-if="visible"
        v-auto-animate
        class="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
        <div class="bg-card rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-foreground">
                    {{ title }}
                </h3>
                <Button
                    variant="destructive"
                    class="rounded-full px-2"
                    size="sm"
                    @click="closeModal"
                >
                    <Icon name="mdi:close" size="20" />
                </Button>
            </div>

            <div>
                <div>
                    <h4 class="font-bold mt-2">Order Details:</h4>
                    <div class="py-2 px-4 rounded bg-secondary text-sm">
                        <p>Transaction No.: {{ data.id }}</p>
                        <p>Date: {{ toBasicDateTime(data.date) }}</p>
                        <p>Customer {{ data.customer_guest }}</p>
                        <p>
                            Total Amount:
                            {{ currencyFormat(data.total_amount) }}
                        </p>
                        <p>
                            Cash Tendered:
                            {{ currencyFormat(data.cash_tendered) }}
                        </p>
                        <p>
                            Change:
                            {{ currencyFormat(data.change) }}
                        </p>
                    </div>

                    <h4 class="font-bold mt-2">Items:</h4>
                    <div
                        class="py-2 px-4 rounded bg-secondary text-sm max-h-[300px] overflow-y-auto"
                    >
                        <ul>
                            <li v-for="item in data.order_items" :key="item.id">
                                * {{ item.product.name }} ({{ item.qty }}pc/s) -
                                {{ currencyFormat(item.total_amount) }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="flex gap-2 p-4">
                    <Button @click="showToggle"> Receipt </Button>
                </div>
            </div>
        </div>
        <div
            v-if="showReceipt"
            class="h-[670px] bg-card rounded-lg overflow-y-scroll p-2 ml-2"
        >
            <ModalOrderReceipt
                :id="data.id"
                :total-amount="data.total_amount"
                :cash-tendered="data.cash_tendered"
                :change="data.change"
                :customer-guest="data.customer_guest"
                :date="data.date"
                :order-items="data.order_items"
                :promotion-amount="data.promotion_amount"
                :total-tax="data.total_tax"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';

defineProps({
    data: {
        default: () => ({}),
        type: Object,
    },
    title: {
        default: 'Order Details',
        type: String,
    },
    visible: Boolean,
});

const emit = defineEmits(['close']);

const closeModal = () => emit('close');

const showReceipt = ref(false);

const showToggle = () => {
    showReceipt.value = !showReceipt.value;
};
</script>
