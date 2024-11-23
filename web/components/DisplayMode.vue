<template>
	<div>
		<Button
			variant="outline"
			class="rounded-full p-3"
			@click="toggleTheme"
		>
			<Icon
				icon="tdesign:mode-light"
				class="size-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Icon
				icon="tdesign:mode-dark"
				class="absolute size-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';

const config = useColorMode();
const toggleTheme = () => {
	config.preference === 'light'
		? (config.preference = 'dark')
		: (config.preference = 'light');
};
</script>
