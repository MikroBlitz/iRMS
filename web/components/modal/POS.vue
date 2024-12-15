<template>
    <div
        v-if="visible"
        class="fixed z-50 inset-0 backdrop-blur-sm flex items-center justify-center text-foreground"
    >
        <div v-auto-animate class="flex space-x-2">
            <div class="bg-card rounded shadow-lg w-full max-w-lg p-6 relative">
                <div class="flex justify-between items-center mb-2 px-4">
                    <h3 class="text-xl font-bold">
                        <template v-if="customerName">
                            {{ `Order for: ${customerName}` }}
                        </template>
                        <template v-else>
                            {{ title }}
                        </template>
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
                    <div
                        v-for="(field, index) in fields"
                        :key="index"
                        class="relative mb-2 px-4"
                    >
                        <label
                            :for="field.name"
                            class="block text-sm font-medium"
                        >
                            {{ field.label }}
                        </label>
                        <input
                            :id="field.name"
                            v-model="form[field.name]"
                            :type="field.type"
                            class="mt-1 block w-full bg-card rounded-md shadow-sm sm:text-sm"
                        />
                    </div>

                    <div class="mb-1 px-4">
                        <label class="block text-md font-medium"
                            >Select Payment Method</label
                        >
                        <div
                            class="mt-1 flex m-auto justify-items-start items-center gap-1"
                        >
                            <div
                                v-for="(payment, index) in Object.values(
                                    paymentMethods,
                                )"
                                :key="index"
                                class="flex items-center justify-center"
                            >
                                <Button
                                    v-model="paymentMethod"
                                    variant="outline"
                                    :disabled="payment.disabled"
                                    :class="{
                                        'bg-emerald-700':
                                            paymentMethod === payment.value,
                                        'bg-card':
                                            paymentMethod !== payment.value,
                                    }"
                                    class="flex items-center justify-center py-6 gap-2"
                                    @click="paymentMethod = payment.value"
                                >
                                    <Icon
                                        :name="payment.icon"
                                        :size="payment.iconSize"
                                    />
                                    {{ payment.name }}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div class="mb-1 px-4">
                        <label class="block text-md font-medium mb-1"
                            >Transaction Summary</label
                        >
                        <div
                            class="bg-card px-4 py-1 rounded border-2 border-primary"
                        >
                            <p class="text-xl">
                                Payment Method:
                                <span class="font-bold">{{
                                    getPaymentMethod(paymentMethod)
                                }}</span>
                            </p>
                            <p
                                class="text-gray-800 dark:text-gray-200 text-2xl font-bold"
                            >
                                Total: {{ transactionTotal }}
                            </p>
                        </div>
                    </div>

                    <div
                        class="flex-col m-auto items-center justify-center mb-2 w-full px-4"
                    >
                        <div class="relative items-center">
                            <Input
                                v-model="cashTendered"
                                type="number"
                                placeholder="Enter Cash"
                                class="pl-10 text-2xl font-bold py-6 rounded-b-none"
                            />
                            <span
                                class="absolute start-0 text-xl inset-y-0 flex items-center justify-center px-5"
                                >₱</span
                            >
                        </div>
                        <div class="relative items-center text-xl">
                            <Input
                                v-model="change"
                                type="number"
                                :class="
                                    change < 0 || change == null
                                        ? 'text-transparent'
                                        : 'text-green-500'
                                "
                                class="pl-32 text-2xl font-bold py-6 rounded-t-none border-b-4"
                                readonly
                            />
                            <span
                                class="absolute start-0 inset-y-0 flex items-center justify-center px-4"
                                >Change: ₱</span
                            >
                        </div>
                        <div class="grid grid-cols-3 gap-1 mt-1">
                            <Button
                                v-for="n in numbers"
                                :key="n"
                                variant="outline"
                                class="text-xl font-bold py-6 rounded-md hover:bg-accent transition duration-300"
                                @click.prevent="appendNumber(n)"
                            >
                                {{ n }}
                            </Button>
                            <Button
                                variant="outline"
                                class="bg-secondary text-xl font-bold py-6 rounded-md hover:bg-accent transition duration-300"
                                @click.prevent="appendDot()"
                            >
                                .
                            </Button>
                            <Button
                                variant="outline"
                                class="text-xl font-bold py-6 rounded-md hover:bg-accent transition duration-300"
                                @click.prevent="appendZero()"
                            >
                                0
                            </Button>
                            <Button
                                variant="outline"
                                class="bg-destructive/70 text-xl font-bold py-6 rounded-md hover:bg-destructive transition duration-300"
                                @click.prevent="clearInput()"
                            >
                                C
                            </Button>
                        </div>
                    </div>

                    <div class="flex justify-center space-x-2 px-4">
                        <Button
                            type="submit"
                            class="p-8 hover:bg-primary/80 transition duration-300 bg-emerald-700 dark:hover:bg-accent w-full"
                            :disabled="change < 0 || loading"
                            @click.prevent="completeOrder"
                        >
                            <template
                                v-if="change < 0 || change == null || loading"
                            >
                                <SpinnerBlocksWave class="size-10 text-white" />
                            </template>
                            <template v-else>
                                <span class="ml-2 text-xl font-bold">{{
                                    submitButtonText
                                }}</span>
                            </template>
                        </Button>
                    </div>
                </div>
            </div>

            <div
                v-if="change >= 0 && !isMobile"
                class="h-[670px] bg-card rounded-lg overflow-y-scroll p-2"
            >
                <PosReceipt />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';

import type { ModalField } from '~/types';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
    getPaymentMethod,
    numbers,
    paymentMethods,
} from '~/composables/useConstant';
import { errorOrder, itemsToReduce } from '~/utils/pos';

const auth = useAuth();
const keys = useMagicKeys();
const proceedPayment: any = keys['Ctrl+Enter'];

const emit = defineEmits(['close']);
defineProps({
    fields: {
        default: () => [],
        type: Array as PropType<ModalField[]>,
    },
    initialValues: {
        default: () => ({}),
        type: Object as PropType<Record<string, any> | null>,
    },
    selectedPaymentMethod: {
        default: '',
        type: String,
    },
    submitButtonText: {
        default: 'Submit',
        type: String,
    },
    title: {
        default: 'POS Checkout',
        type: String,
    },
    transactionTotal: {
        default: 0,
        type: String,
    },
    visible: Boolean,
});

const { upsertOrder } = await import('~/graphql/Order');
const { reduceInventory } = await import('~/graphql/Inventory');

const isMobile = inject('isMobile');
const form = ref<Record<string, any>>({});
const loading = ref(false);
const receiptVisible = ref(false);

const cartStore: any = useCart();
const totalAmount = cartStore.totalAmountWithTaxAndDiscount;

const customerName: any = inject('customerName');
const cashTendered: any = inject('cashTendered');
const paymentMethod: any = inject('paymentMethod');
const status: any = inject('status');
const change: ComputedRef<number> = computed(() =>
    parseFloat((cashTendered.value - totalAmount).toFixed(2)),
);

const appendZero = () =>
    cashTendered.value.length > 0
        ? (cashTendered.value = cashTendered.value + '0')
        : null;
const appendNumber = (num: string) =>
    (cashTendered.value = (cashTendered.value + num).toString());
const clearInput = () => {
    cashTendered.value = '';
    receiptVisible.value = false;
};
const appendDot = () =>
    !cashTendered.value.includes('.')
        ? (cashTendered.value = cashTendered.value + '.')
        : null;

const closeModal = () => {
    emit('close');
};

const completeOrder = async () => {
    try {
        loading.value = true;

        if (auth.user.role === 0 || !auth.user.role) {
            loading.value = false;
            return toasts('Only authorized users can complete orders.', {
                type: 'error',
            });
        }

        if (!customerName.value) {
            loading.value = false;
            return toasts('Please enter a customer name!', { type: 'error' });
        }

        const { mutate: mutateOrderDetails } = useMutation(upsertOrder);
        await mutateOrderDetails({
            input: orderDetails(
                orderItems(cartStore),
                cashTendered,
                change,
                customerName,
                paymentMethod,
                status,
                totalAmount,
                generateTransactionId.value,
            ),
        });

        const { mutate: reduceInventoryItems } = useMutation(reduceInventory);
        await reduceInventoryItems({
            products: itemsToReduce(cartStore),
        });

        loading.value = false;
        emit('close');
        cartStore.paymentSuccess();

        cashTendered.value = '';
        customerName.value = 'Guest';
        paymentMethod.value = 0;
    } catch (error: any) {
        errorOrder(error);
    }
};

watch(proceedPayment, (e) => {
    if (e) {
        completeOrder();
    }
});

useBodyClass('overflow-hidden');
</script>
