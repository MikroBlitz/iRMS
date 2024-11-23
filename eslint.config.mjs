import perfectionist from 'eslint-plugin-perfectionist';

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
	plugins: {
		perfectionist,
	},
	rules: {
		'perfectionist/sort-interfaces': ['error'],
		'perfectionist/sort-objects': ['error', {
			type: 'alphabetical',
		}],
	},
	settings: {
		perfectionist: {
			partitionByComment: true,
			type: 'line-length',
		},
	},
});
