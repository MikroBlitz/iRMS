<template>
	<div>
		<Head>
			<Title>{{ pageTitle }}</Title>
		</Head>

		<main
			v-auto-animate
			class="max-w-screen-2xl mx-auto h-[780px]"
		>
			<ClientOnly>
				<TableHeader
					:title="pageTitle"
					:icon="icon"
					:search-bar="false"
				/>
				<div
					class="mt-2 flex items-center justify-center flex-wrap gap-2 p-4"
				>
					<div
						v-for="item in itemLinks"
						:key="item.title"
					>
						<NuxtLink
							:to="item.path"
							class="p-4 px-6 hover:bg-accent transition duration-300 rounded flex items-center gap-2 bg-secondary dark:bg-primary dark:hover:bg-accent w-[200px]"
						>
							<Icon
								:class="item.iconColor"
								:name="item.icon"
								size="40"
							/>
							<span :class="item.textColor">{{
								item.title
							}}</span>
						</NuxtLink>
					</div>
				</div>
			</ClientOnly>
		</main>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'app-layout',
});

const icon = 'solar:settings-linear';
const pageTitle = 'Settings';
const itemLinks = [
	{
		icon: 'mdi:theme-light-dark',
		iconColor: 'text-foreground',
		path: '/settings/themes',
		textColor: 'text-foreground',
		title: 'Themes',
	},
	{
		icon: 'mdi:currency-usd',
		iconColor: 'text-foreground',
		path: '/settings/promotions',
		textColor: 'text-foreground',
		title: 'Promotions',
	},
	{
		icon: 'mdi:percent',
		iconColor: 'text-foreground',
		path: '/settings/tax-rules',
		textColor: 'text-foreground',
		title: 'Tax Rules',
	},
	{
		icon: 'mdi:blog',
		iconColor: 'text-foreground',
		path: '/settings/logs',
		textColor: 'text-foreground',
		title: 'Logs',
	},
	{
		icon: 'mdi:trash-can-outline',
		iconColor: 'text-foreground',
		path: '/settings/recycle-bin',
		textColor: 'text-foreground',
		title: 'Recycle Bin',
	},
];
</script>
