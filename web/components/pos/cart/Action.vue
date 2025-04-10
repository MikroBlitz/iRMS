<template>
    <div v-auto-animate class="bg-secondary px-6 pb-4 pt-1 shadow-md">
        <div class="flex justify-between items-center gap-3">
            <PosCartScanner />

            <div class="flex gap-4">
                <Button
                    class="rounded-lg p-4 py-6 bg-primary/70 hover:bg-primary/80 hover:scale-105 transition-all ease-in-out"
                    :class="
                        cartStore.cartItems.length
                            ? ''
                            : 'opacity-50 cursor-not-allowed'
                    "
                    @click.prevent="handleSubmit"
                >
                    <Icon
                        name="mdi:gesture-tap-hold"
                        size="32"
                        class="text-white"
                    />
                    <p class="text-secondary dark:text-foreground text-xl">
                        {{ cartStore.cartItems.length ? 'Hold' : '' }}
                    </p>
                </Button>

                <Button
                    type="button"
                    class="rounded-lg p-6 py-6 bg-emerald-700 hover:bg-emerald-500 hover:scale-105 transition-all ease-in-out"
                    :disabled="!cartStore.cartItems.length"
                    @click.prevent="openPosModal"
                >
                    <Icon
                        :name="
                            cartStore.cartItems.length
                                ? 'solar:hand-money-bold'
                                : 'mdi:cart-arrow-down'
                        "
                        size="32"
                        class="text-white"
                        :class="cartStore.cartItems.length ? 'mr-2' : ''"
                    />
                    <p class="text-white text-xl">
                        {{ cartStore.cartItems.length ? 'Pay' : '' }}
                    </p>
                </Button>
            </div>
        </div>

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
import { useMagicKeys, useTimeoutFn } from '@vueuse/core';
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

const handleSubmit = () => {
    const orderData = cartStore.cartItems.map((product) => ({
        item: product.item,
        price: product.price,
        qty: product.qty,
        total_amount: product.amount,
    }));
    cartStore.holdOrder(customerName.value);
    if (customerName.value.length > 0) {
        console.log(`Order for ${customerName.value}:`, orderData);
        useTimeoutFn(() => {
            router.push('/orders');
        }, 2000);
    }
    closePosModal();
};

watch(continuePayment, (e) => (e ? openPosModal() : null));
watch(closeModal, (e) => (e ? closePosModal() : null));
</script>
