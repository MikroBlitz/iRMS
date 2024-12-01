<template>
    <div
        class="flex m-auto items-center justify-between bg-primary/80 p-1 rounded"
    >
        <ClientOnly>
            <div
                class="flex items-center gap-2 text-background dark:text-foreground"
            >
                <div v-if="!isMobile" class="relative flex">
                    <Icon
                        :name="
                            !cartStore.cartItems.length
                                ? 'solar:cart-large-minimalistic-outline'
                                : 'solar:cart-large-minimalistic-bold'
                        "
                        size="30"
                    />
                    <span
                        class="absolute rounded-full bg-destructive px-2 -top-2 -right-3 text-background dark:text-foreground font-bold"
                    >
                        {{ cartStore.cartItems.length || '' }}
                    </span>
                </div>
                <p
                    :class="{ 'pl-2': isMobile }"
                    class="text-2xl font-bold py-1"
                >
                    Cart
                </p>
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
                        name="solar:user-hand-up-linear"
                        size="25"
                    />
                    <input
                        v-model="customerName"
                        type="text"
                        placeholder="Customer name"
                        class="pl-9 py-2 rounded outline-none bg-card"
                        :class="isMobile ? 'w-[230px]' : 'w-auto'"
                    />
                </span>
                <Button
                    type="button"
                    variant="destructive"
                    class="flex p-2 rounded"
                    @click.prevent="clearCart()"
                >
                    <Icon name="solar:cart-cross-bold" size="30" />
                </Button>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { toasts } from '~/composables/useToast'
import { useCart } from '~/stores/useCart'

const cartStore = useCart()
const customerName: any = inject('customerName')
const isMobile = inject('isMobile')

const openToolsDrawer: any = inject('openToolsDrawer')
const closeDrawer = () => {
    openToolsDrawer.value = false
}

const clearCart = () => {
    cartStore.clearCart()
    customerName.value = 'Guest'
    toasts('Cart cleared!', { type: 'success' })
    try {
        closeDrawer()
    } catch (e: any) {
        console.warn('Drawer not found', e.message)
    }
}
</script>
