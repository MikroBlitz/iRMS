<template>
	<div
		:class="color"
		class="w-full md:w-[280px] xl:w-[400px] p-8 rounded-xl flex-col"
	>
		<div class="flex items-start justify-between">
			<div>
				<div class="text-sm text-foreground font-medium">
					{{ title }}
				</div>
				<div class="text-xl xl:text-3xl font-bold">
					{{ value }}
				</div>
			</div>
			<Icon
				:name="icon"
				:size="size"
			/>
		</div>
		<div
			class="border-b-2 mt-4"
			:class="borderColor"
		/>
	</div>
</template>

<script setup lang="ts">
defineProps({
	borderColor: {
		default: 'border-blue-300 dark:border-blue-500',
		type: String,
	},
	color: {
		default: 'bg-blue-100 dark:bg-blue-900',
		type: String,
	},
	icon: {
		required: true,
		type: String,
	},
	size: {
		default: '30',
		type: String,
	},
	title: {
		required: true,
		type: String,
	},
	value: {
		default: 0,
		required: true,
		type: [Number, String],
	},
});
</script>
