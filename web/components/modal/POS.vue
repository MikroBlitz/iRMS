<template>
    <div
        v-if="visible"
        class="fixed z-50 inset-0 backdrop-blur-sm flex items-center justify-center text-foreground"
    >
        <div v-auto-animate class="flex space-x-2 items-center justify-center">
            <div
                class="w-full max-w-lg overflow-hidden rounded-xl bg-background shadow-xl"
            >
                <div class="border-b bg-muted/40 pl-4 p-2">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-semibold">
                            {{
                                customerName
                                    ? `Order for: ${customerName}`
                                    : title
                            }}
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            class="rounded-full hover:bg-destructive/10 hover:text-destructive"
                            @click="closeModal"
                        >
                            <Icon name="mdi:close" size="24" />
                        </Button>
                    </div>
                </div>

                <div class="px-6 pt-2 pb-6">
                    <div>
                        <label
                            class="text-sm font-medium text-muted-foreground"
                        >
                            Payment Method
                        </label>
                        <div class="grid grid-cols-3 gap-2">
                            <Button
                                v-for="payment in Object.values(paymentMethods)"
                                :key="payment.value"
                                :disabled="payment.disabled"
                                :variant="
                                    paymentMethod === payment.value
                                        ? 'default'
                                        : 'outline'
                                "
                                class="h-16 gap-2"
                                @click="paymentMethod = payment.value"
                            >
                                <Icon
                                    :name="payment.icon"
                                    :size="payment.iconSize"
                                />
                                <span>{{ payment.name }}</span>
                            </Button>
                        </div>
                    </div>

                    <div class="mt-2 rounded-lg border bg-muted/30 p-4">
                        <div class="space-y-2">
                            <div
                                class="flex justify-between text-sm text-muted-foreground"
                            >
                                <span>Payment Method</span>
                                <span class="font-medium">{{
                                    getPaymentMethod(paymentMethod)
                                }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-lg font-medium"
                                    >Total Amount</span
                                >
                                <span class="text-lg font-bold">{{
                                    transactionTotal
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-2 space-y-2">
                        <div class="relative">
                            <span
                                class="absolute inset-y-0 left-3 flex items-center text-xl"
                                >₱</span
                            >
                            <Input
                                v-model="cashTendered"
                                type="number"
                                placeholder="Enter Cash"
                                class="h-14 pl-8 text-xl font-bold"
                            />
                        </div>
                        <div class="relative">
                            <span
                                class="absolute font-bold inset-y-0 left-3 flex items-center text-muted-foreground"
                            >
                                Change:
                                <span
                                    :class="[
                                        'pl-1 text-xl font-bold',
                                        change < 0 || change == null
                                            ? 'text-transparent'
                                            : 'text-emerald-700 dark:text-emerald-500',
                                    ]"
                                    >₱</span
                                >
                            </span>
                            <Input
                                v-model="change"
                                type="number"
                                readonly
                                :class="[
                                    'h-14 pl-24 text-xl font-bold',
                                    change < 0 || change == null
                                        ? 'text-transparent'
                                        : 'text-emerald-700 dark:text-emerald-500',
                                ]"
                            />
                        </div>
                    </div>

                    <div class="mt-2 grid grid-cols-3 gap-2">
                        <Button
                            v-for="n in 9"
                            :key="n"
                            variant="outline"
                            class="h-14 text-lg font-medium hover:bg-muted"
                            @click="appendNumber(n)"
                        >
                            {{ n }}
                        </Button>
                        <Button
                            variant="outline"
                            class="h-14 text-lg bg-secondary font-medium hover:bg-muted"
                            @click="appendDot"
                        >
                            .
                        </Button>
                        <Button
                            variant="outline"
                            class="h-14 text-lg font-medium hover:bg-muted"
                            @click="appendZero"
                        >
                            0
                        </Button>
                        <Button
                            variant="outline"
                            class="h-14 bg-destructive/50 text-lg text-foreground font-medium hover:bg-destructive/70"
                            @click="clearInput"
                        >
                            C
                        </Button>
                    </div>

                    <div class="mt-4">
                        <Button
                            type="submit"
                            class="h-16 w-full"
                            :class="[
                                change >= 0
                                    ? 'bg-emerald-600 hover:bg-emerald-700'
                                    : 'bg-muted',
                            ]"
                            :disabled="change < 0 || loading"
                            @click="completeOrder"
                        >
                            <template
                                v-if="change < 0 || change == null || loading"
                            >
                                <SpinnerBlocksWave class="h-8 w-8" />
                            </template>
                            <template v-else>
                                <span class="text-lg font-bold">{{
                                    submitButtonText
                                }}</span>
                            </template>
                        </Button>
                    </div>
                </div>
            </div>

            <div
                v-if="change >= 0 && !isMobile"
                class="max-h-[calc(100vh-230px)] overflow-auto border bg-card shadow-lg"
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
import { getPaymentMethod, paymentMethods } from '~/composables/useConstant';
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
