<template>
    <div
        v-if="visible"
        class="fixed inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center"
    >
        <div
            v-on-click-outside="closeModal"
            class="bg-card rounded-lg shadow-lg w-full max-w-lg p-6 relative"
        >
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
                <p class="text-base text-foreground">
                    <strong>Transaction No.:</strong> {{ data.id }}
                </p>
                <p class="text-base text-foreground">
                    <strong>Date:</strong> {{ toBasicDateTime(data.date) }}
                </p>
                <p class="text-base text-foreground">
                    <strong>Customer:</strong> {{ data.customer_guest }}
                </p>
                <p class="text-base text-foreground">
                    <strong>Total Amount:</strong>
                    {{ currencyFormat(data.total_amount) }}
                </p>
                <p class="text-base text-foreground">
                    <strong>Cash Tendered:</strong>
                    {{ currencyFormat(data.cash_tendered) }}
                </p>
                <p class="text-base text-foreground">
                    <strong>Change:</strong> {{ currencyFormat(data.change) }}
                </p>

                <h4 class="text-lg font-bold text-foreground mt-4">
                    Ordered Items:
                </h4>
                <ul>
                    <li
                        v-for="item in data.order_items"
                        :key="item.id"
                        class="text-base text-foreground"
                    >
                        * {{ item.product.name }} ({{ item.qty }}pc/s) -
                        {{ currencyFormat(item.total_amount) }}
                    </li>
                </ul>
            </div>

            <div class="flex gap-2 p-4">
                <Button @click="showToggle"> Receipt </Button>
            </div>

            <div v-if="showReceipt">
                <PosReceipt />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';

import { Button } from '~/components/ui/button';

defineProps({
    visible: Boolean,
    title: {
        type: String,
        default: 'Order Details',
    },
    data: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(['close']);

const closeModal = () => emit('close');

const showReceipt = ref(false);

const showToggle = () => {
    showReceipt.value = !showReceipt.value;
};
</script>
