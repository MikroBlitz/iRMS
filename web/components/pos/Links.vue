<template>
    <div
        class="flex p-2 px-4 m-auto items-center justify-between bg-secondary rounded-b mb-0.5"
    >
        <ClientOnly>
            <div class="flex items-center gap-2 justify-center">
                <PosProductFilter />
                <NuxtLink
                    v-for="(link, index) in posLinks"
                    :key="index"
                    class="p-1 justify-center flex items-center gap-2 hover:bg-accent transition duration-300 rounded md:p-2"
                    :to="link.path"
                >
                    <Icon :name="link.icon" size="25" />
                    <span class="text-sm hidden font-bold md:block">{{
                        link.title
                    }}</span>
                </NuxtLink>
            </div>
            <div>
                <PosTools :class="{ hidden: !isMobile }" />
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
const posLinks = [
    {
        title: 'Products',
        path: '/products',
        icon: 'solar:shop-linear',
    },
    {
        title: 'Inventories',
        path: '/inventories',
        icon: 'solar:box-minimalistic-linear',
    },
    {
        title: 'Customers',
        path: '/customers',
        icon: 'solar:user-hand-up-linear',
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: 'solar:cart-outline',
    },
];

const isMobile = inject('isMobile');
</script>
