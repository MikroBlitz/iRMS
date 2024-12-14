export const getNestedValue = (item: any, key: any) =>
    key.split('.').reduce((acc: any, part: any) => acc && acc[part], item);

export const transformGraphQLInputData = (formData: any) => {
    const input = JSON.parse(
        JSON.stringify(formData, (key, value) =>
            ['__typename', 'created_at', 'updated_at', 'deleted_at'].includes(
                key,
            )
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

        // TODO: refactor this, for combobox fields
        key === 'user' ? (input.user = { connect: value.id || value }) : null;

        Array.isArray(value)
            ? (input[key] = {
                  upsert: value.map((item) => ({
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
    const errorMessage =
        graphQLError?.extensions?.debugMessage ||
        graphQLError?.message ||
        'An error occurred';
    toasts(`Failed to ${action}: ${errorMessage}`, { type: 'error' });
    console.error(`Error during ${action}:`, error);
};

export async function fetchGraphQLQuery(
    model: string,
    queryName: string,
): Promise<any> {
    const queryModule = await import(`~/graphql/${model}.ts`);
    return queryModule[queryName];
}

export async function loadFieldOptions(field: any, data: any) {
    try {
        const query = await fetchGraphQLQuery(field.model, field.queryName);
        if (query) {
            const result: any = await useAsyncQuery(query);
            const resultKey: any = Object.keys(result.data.value)[0];
            data.value[field.model.toLowerCase()] =
                result.data.value[resultKey] || [];
        }
    } catch (error) {
        console.error(
            `Failed to load options for field ${field.model}:`,
            error,
        );
    }
}

export async function processFields(fields: any[], data: any) {
    for (const field of fields) {
        if (
            (field.type === 'select' || field.type === 'combobox') &&
            field.model &&
            field.queryName
        ) {
            await loadFieldOptions(field, data);
        }
    }
}
