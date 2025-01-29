<template>
    <div
        class="flex pl-2 pr-3 py-1 m-auto items-center justify-between bg-[hsl(var(--card))] rounded-b-2xl shadow-md"
    >
        <ClientOnly>
            <div class="flex items-center gap-3">
                <PosProductFilter />
                <NuxtLink
                    v-for="(link, index) in posLinks"
                    :key="index"
                    class="flex items-center gap-2 px-3 py-2 text-[hsl(var(--foreground))] rounded transition duration-300 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
                    :to="link.path"
                >
                    <Icon :name="link.icon" size="22" />
                    <span class="text-sm hidden md:block">{{
                        link.title
                    }}</span>
                </NuxtLink>
            </div>
            <div>
                <PosTools
                    :class="{ hidden: !isMobile }"
                    class="transition-opacity duration-300"
                />
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
const posLinks = [
    {
        icon: 'solar:shop-linear',
        path: '/products',
        title: 'Products',
    },
    {
        icon: 'solar:box-minimalistic-linear',
        path: '/inventories',
        title: 'Inventories',
    },
    {
        icon: 'solar:user-hand-up-linear',
        path: '/customers',
        title: 'Customers',
    },
    {
        icon: 'solar:cart-outline',
        path: '/orders',
        title: 'Orders',
    },
];

const isMobile = inject('isMobile');
</script>
