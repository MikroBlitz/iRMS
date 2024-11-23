import {
	defineNuxtModule,
	addComponent,
	addComponentsDir,
	tryResolveModule,
} from 'nuxt/kit';

export interface ShadcnVueOptions {
	/**
     * Prefix for all the imported component
     */
	prefix: string;

	/**
     * Directory that the component lives in.
     * @default "~/components/ui"
     */
	componentDir: string;
}

export default defineNuxtModule<ShadcnVueOptions>({
	defaults: {
		componentDir: '~/components/ui',
		prefix: 'Ui',
	},
	meta: {
		compatibility: {
			bridge: false,
			nuxt: '^3.9.0',
		},
		configKey: 'shadcn',
		name: 'ShadcnVue',
		version: '0.0.1',
	},
	async setup({ componentDir, prefix }) {
		const isVeeValidateExist = await tryResolveModule('vee-validate');

		addComponentsDir(
			{
				extensions: ['.vue'],
				path: componentDir,
				pathPrefix: false,
				prefix,
			},
			{
				prepend: true,
			},
		);

		if (isVeeValidateExist !== undefined) {
			addComponent({
				export: 'Form',
				filePath: 'vee-validate',
				name: `${prefix}Form`,
				priority: 999,
			});

			addComponent({
				export: 'Field',
				filePath: 'vee-validate',
				name: `${prefix}FormField`,
				priority: 999,
			});
		}

		addComponent({
			export: 'PaginationRoot',
			filePath: 'radix-vue',
			name: `${prefix}Pagination`,
			priority: 999,
		});

		addComponent({
			export: 'PaginationList',
			filePath: 'radix-vue',
			name: `${prefix}PaginationList`,
			priority: 999,
		});

		addComponent({
			export: 'PaginationListItem',
			filePath: 'radix-vue',
			name: `${prefix}PaginationListItem`,
			priority: 999,
		});
	},
});

declare module '@nuxt/schema' {
	interface NuxtConfig {
		shadcn?: ShadcnVueOptions;
	}
	interface NuxtOptions {
		shadcn?: ShadcnVueOptions;
	}
}
