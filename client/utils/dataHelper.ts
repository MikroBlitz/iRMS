export const getNestedValue = (item: any, key: any) => {
    return key
        .split('.')
        .reduce((acc: any, part: any) => acc && acc[part], item);
};

export const transformGraphQLInputData = (formData: any) => {
    const input = JSON.parse(
        JSON.stringify(formData, (key, value) =>
            key === '__typename' ? undefined : value,
        ),
    );

    Object.keys(input).forEach((key) => {
        const value = input[key];

        // TODO: improve graphql 'connect' relationships (e.g., user_id)
        key.endsWith('_id')
            ? ((input[key.replace('_id', '')] = { connect: value }),
              delete input[key])
            : null;

        // TODO: improve 'upsert' relationships (e.g., users)
        Array.isArray(value)
            ? (input[key] = {
                  upsert: value.map((item: any) => ({
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
