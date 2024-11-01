export async function useGraphQLQuery(model: string) {
    const pluralName = getPluralName(model);
    const capitalizedName = getCapSingularName(model);
    let GET_ALL_QUERY, PAGINATE_QUERY, UPSERT_MUTATION, DELETE_MUTATION;

    try {
        const graphqlModule = await import(`~/graphql/${capitalizedName}.ts`);
        GET_ALL_QUERY = graphqlModule[`${pluralName}`];
        PAGINATE_QUERY = graphqlModule[`${pluralName}Paginate`];
        UPSERT_MUTATION = graphqlModule[`upsert${capitalizedName}`];
        DELETE_MUTATION = graphqlModule[`delete${capitalizedName}`];

        if (
            !PAGINATE_QUERY ||
            !UPSERT_MUTATION ||
            !DELETE_MUTATION ||
            !GET_ALL_QUERY
        ) {
            throw new Error(
                `Required GraphQL operations not found for model: ${model}`,
            );
        }

        return {
            PAGINATE_QUERY,
            UPSERT_MUTATION,
            DELETE_MUTATION,
            GET_ALL_QUERY,
        };
    } catch (error) {
        console.error(
            `Error importing GraphQL operations for ${model}:`,
            error,
        );
        throw error;
    }
}
