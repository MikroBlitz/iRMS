<template>
    <div v-auto-animate class="bg-secondary px-3 py-1 rounded-b">
        <div class="flex justify-between items-center gap-1">
            <PosCartScanner />

            <div class="flex gap-1">
                <Button
                    class="rounded p-4 py-8 bg-primary/70 hover:bg-primary hover:scale-105 transition ease-in-out delay-150"
                    :class="
                        cartStore.cartItems.length
                            ? ''
                            : 'opacity-0 disabled cursor-default'
                    "
                    @click.prevent="handleSubmit"
                >
                    <Icon
                        name="mdi:gesture-tap-hold"
                        size="30"
                        class="text-white"
                    />
                    <p class="text-secondary dark:text-foreground text-xl">
                        {{ cartStore.cartItems.length ? 'Hold' : '' }}
                    </p>
                </Button>

                <Button
                    type="button"
                    class="rounded p-6 py-8 bg-emerald-700 hover:scale-105 transition ease-in-out delay-150"
                    :disabled="!cartStore.cartItems.length"
                    @click.prevent="openPosModal"
                >
                    <Icon
                        :name="
                            cartStore.cartItems.length
                                ? 'solar:hand-money-bold'
                                : 'mdi:cart-arrow-down'
                        "
                        size="30"
                        class="text-white"
                        :class="cartStore.cartItems.length ? 'mr-2' : ''"
                    />
                    <p class="text-white text-xl">
                        {{ cartStore.cartItems.length ? 'Pay' : '' }}
                    </p>
                </Button>
            </div>
        </div>

        <!-- PosModal Component -->
        <ModalPOS
            v-if="showModal"
            :visible="showModal"
            :title="modalTitle"
            :initial-values="selectedEntity"
            :submit-button-text="modalButtonText"
            :transaction-total="
                currencyFormat(cartStore.totalAmountWithTaxAndDiscount)
            "
            :selected-payment-method="selectedPaymentMethod"
            @submit="useCart().paymentSuccess()"
            @close="closePosModal"
        />
    </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import { Button } from '@/components/ui/button';

import { useCart } from '~/stores/useCart';

const keys = useMagicKeys();
const continuePayment = keys['Ctrl+Enter'];
const closeModal = keys['Escape'];
const router = useRouter();
const cartStore = useCart();

const showModal = ref(false);
const modalTitle = ref('');
const modalButtonText = ref('');
const selectedEntity = ref(null);
const selectedPaymentMethod = ref('');

const openPosModal = () => {
    modalTitle.value = 'Checkout';
    modalButtonText.value = 'Complete Payment';
    showModal.value = true;
};

const closePosModal = () => {
    showModal.value = false;
};

const customerName: any = inject('customerName');

// TODO: Hold Order
const handleSubmit = () => {
    const orderData = cartStore.cartItems.map((product) => {
        return {
            item: product.item,
            qty: product.qty,
            price: product.price,
            total_amount: product.amount,
        };
    });
    cartStore.holdOrder(customerName.value);
    if (customerName.value.length > 0) {
        console.log(`Order for ${customerName.value}:`, orderData);
        setTimeout(() => {
            router.push('/orders');
        }, 2000);
    }
    closePosModal();
};

watch(continuePayment, (e) => (e ? openPosModal() : null));
watch(closeModal, (e) => (e ? closePosModal() : null));
</script>
