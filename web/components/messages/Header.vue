<template>
	<div
		class="flex m-auto items-center justify-between bg-primary px-3 p-2 rounded mb-1.5"
	>
		<ClientOnly>
			<div class="flex items-center gap-2 justify-center">
				<Button
					variant="destructive"
					class="rounded-full p-2 flex items-center justify-center"
					@click="router.push('/dashboard')"
				>
					<Icon
						name="mdi:exit-to-app"
						size="25"
						style="rotate: 180deg"
						class="text-gray-100"
					/>
				</Button>
				<p class="text-gray-100 text-2xl font-bold">
					<span>Messages</span>
				</p>
			</div>
			<div class="flex items-center gap-2 justify-between">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<DisplayMode />
						</TooltipTrigger>
						<TooltipContent>
							<p>Display Mode</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '~/components/ui/tooltip';
import { Button } from '~/components/ui/button';

const router = useRouter();
</script>
