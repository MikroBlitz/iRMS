<template>
	<div class="text-gray-500 m-auto flex justify-center items-center">
		<Drawer v-model:open="openToolsDrawer">
			<DrawerTrigger>
				<div class="relative flex items-center gap-2">
					<Icon
						:name="
							!cartStore.cartItems.length
								? 'solar:cart-large-minimalistic-outline'
								: 'solar:cart-large-minimalistic-bold'
						"
						size="30"
						class="text-gray-900 dark:text-gray-300"
					/>
					<span
						class="absolute rounded-full bg-destructive px-2 -top-1.5 -right-3 text-background dark:text-foreground font-bold"
					>
						{{ cartStore.cartItems.length || '' }}
					</span>
				</div>
			</DrawerTrigger>
			<DrawerContent
				class="h-dvh rounded border-2 border-gray-300 dark:border-gray-800"
			>
				<DrawerTitle visually-hidden />
				<DrawerDescription visually-hidden />

				<PosCart />
			</DrawerContent>
		</Drawer>
	</div>
</template>

<script setup lang="ts">
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
	DrawerDescription,
	DrawerTitle,
} from '@/components/ui/drawer';

import { useCart } from '~/stores/useCart';

const openToolsDrawer = ref(false);
provide('openToolsDrawer', openToolsDrawer);

const cartStore = useCart();
</script>
