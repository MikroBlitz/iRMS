<template>
	<div
		class="flex p-1 px-4 m-auto items-center justify-between bg-card rounded-b mb-0.5"
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
					<Icon
						:name="link.icon"
						size="25"
					/>
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
