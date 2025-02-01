<template>
    <div
        v-if="visible"
        v-auto-animate
        class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
        <div
            v-on-click-outside="closeModal"
            class="bg-card rounded-xl shadow-xl w-full max-w-2xl relative"
        >
            <div class="border-b p-6">
                <div class="flex justify-between items-center">
                    <h3 class="text-2xl font-semibold text-foreground">
                        {{ title }}
                    </h3>
                    <Button
                        variant="destructive"
                        class="rounded-full size-8 p-0"
                        size="sm"
                        @click="closeModal"
                    >
                        <Icon name="mdi:close" size="20" />
                    </Button>
                </div>
            </div>

            <div class="p-6">
                <div>
                    <div>
                        <h4 class="text-lg font-semibold flex items-center">
                            <Icon
                                name="mdi:chevron-right"
                                class="text-primary"
                            />
                            Order Details
                        </h4>
                        <div
                            class="grid grid-cols-2 gap-4 bg-secondary/50 rounded-lg p-4"
                        >
                            <div>
                                <p class="text-sm text-muted-foreground">
                                    Transaction No.
                                </p>
                                <p class="font-medium">
                                    {{ data.transaction_number }}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-muted-foreground">
                                    Date
                                </p>
                                <p class="font-medium">
                                    {{ toBasicDateTime(data.date) }}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-muted-foreground">
                                    Customer
                                </p>
                                <p class="font-medium">
                                    {{ data.customer_guest }}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-muted-foreground">
                                    Total Amount
                                </p>
                                <p>{{ currencyFormat(data.total_amount) }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <h4 class="text-lg font-semibold flex items-center">
                            <Icon
                                name="mdi:chevron-right"
                                class="text-primary"
                            />
                            Payment Details
                        </h4>
                        <div class="bg-secondary/50 rounded-lg p-4 space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-muted-foreground"
                                    >Cash Tendered</span
                                >
                                <span class="font-medium">{{
                                    currencyFormat(data.cash_tendered)
                                }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-muted-foreground"
                                    >Change</span
                                >
                                <span class="font-medium">{{
                                    currencyFormat(data.change)
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <h4 class="text-lg font-semibold flex items-center">
                            <Icon
                                name="mdi:chevron-right"
                                class="text-primary"
                            />
                            Items
                        </h4>
                        <div class="bg-secondary/50 rounded-lg p-4">
                            <div
                                class="max-h-[200px] overflow-y-auto pr-2 space-y-1"
                            >
                                <div
                                    v-for="item in data.order_items"
                                    :key="item.id"
                                    class="flex justify-between items-center py-1 border-b last:border-0"
                                >
                                    <div>
                                        <p class="font-medium">
                                            {{ item.product.name }}
                                        </p>
                                        <p
                                            class="text-sm text-muted-foreground"
                                        >
                                            Quantity: {{ item.qty }}pc/s
                                        </p>
                                    </div>
                                    <p class="font-medium">
                                        {{ currencyFormat(item.total_amount) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end pt-4">
                        <Button
                            :variant="showReceipt ? 'outline' : 'default'"
                            class="gap-2"
                            @click="showToggle"
                        >
                            <Icon
                                :name="showReceipt ? 'mdi:eye-off' : 'mdi:eye'"
                                size="18"
                            />
                            {{ showReceipt ? 'Hide Receipt' : 'Show Receipt' }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="showReceipt"
            class="max-h-[calc(100vh-230px)] border bg-card overflow-y-auto ml-2"
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
                :transaction-number="data.transaction_number"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
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

useBodyClass('overflow-hidden');
</script>
