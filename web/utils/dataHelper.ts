export const getNestedValue = (item: any, key: any) =>
	key.split('.').reduce((acc: any, part: any) => acc && acc[part], item);

export const transformGraphQLInputData = (formData: any) => {
	const input = JSON.parse(
		JSON.stringify(formData, (key, value) =>
			['__typename', 'created_at', 'updated_at', 'deleted_at'].includes(key)
				? undefined
				: value,
		),
	);

	Object.keys(input).forEach((key) => {
		const value = input[key];

		// for select fields
		key.endsWith('_id')
			? ((input[key.replace('_id', '')] = { connect: value }),
				delete input[key])
			: null;

		// for combobox fields
		key === 'user' ? (input.user = { connect: value.id || value }) : null;

		Array.isArray(value)
			? (input[key] = {
					upsert: value.map(item => ({
						id: item.id,
						...item,
					})),
				})
			: null;
	});

	return input;
};

export const handleGraphQLError = (error: any, action: string) => {
	const graphQLError = error?.graphQLErrors?.[0];
	const errorMessage
        = graphQLError?.extensions?.debugMessage
        || graphQLError?.message
        || 'An error occurred';
	toasts(`Failed to ${action}: ${errorMessage}`, { type: 'error' });
	console.error(`Error during ${action}:`, error);
};
