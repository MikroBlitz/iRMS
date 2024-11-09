<template>
    <div
        class="flex m-auto items-center justify-between bg-secondary p-1 rounded"
    >
        <ClientOnly>
            <div class="flex items-center gap-1 text-foreground">
                <div class="relative flex">
                    <Icon name="mdi-cart" size="30" />
                    <span
                        class="absolute rounded-full bg-background px-2 -top-2 -right-2 text-foreground font-bold"
                        :class="{ hidden: !cartStore.cartItems.length }"
                    >
                        {{ cartStore.cartItems.length }}
                    </span>
                </div>
                <p class="text-2xl font-bold py-1">Cart</p>
            </div>
            <div
                class="flex gap-2"
                :class="{ hidden: !cartStore.cartItems.length }"
            >
                <span
                    class="relative"
                    :class="
                        cartStore.cartItems.length
                            ? ''
                            : 'opacity-0 disabled cursor-default'
                    "
                >
                    <Icon
                        class="absolute left-2 top-2 text-foreground"
                        name="mdi-account-multiple"
                        size="25"
                    />
                    <input
                        v-model="customerName"
                        type="text"
                        placeholder="Customer name"
                        class="pl-9 py-2 rounded-xl outline-none bg-card"
                        :class="isMobile ? 'w-[230px]' : 'w-auto'"
                    />
                </span>
                <Button
                    type="button"
                    variant="destructive"
                    class="flex p-2 rounded"
                    @click="clearCart()"
                >
                    <Icon
                        name="mdi-cart-remove"
                        size="23"
                        class="text-gray-100 px-6"
                    />
                </Button>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { useCart } from '~/stores/useCart';
import { toasts } from '~/composables/useToast';

const cartStore = useCart();
const customerName: any = inject('customerName');
const isMobile = inject('isMobile');

const clearCart = () => {
    cartStore.clearCart();
    customerName.value = 'Guest';
    toasts('Cart cleared!', { type: 'success' });
};
</script>
