import type { PaginatorInfo, CrudModalField } from '~/types';

export async function useModelCrud(model: string, fields: CrudModalField[]) {
    const pluralName = getPluralName(model);
    const singularName = getSingularName(model);

    const modelData = ref([]);
    const modalFields = ref(fields);
    const isLoading = ref(false);

    const paginatorInfo: Record<string, any> = ref<PaginatorInfo>();
    const currentPage: number = paginatorInfo.value?.currentPage || 1;
    const perPage: number = paginatorInfo.value?.perPage || 10;

    // GraphQL Dynamic Queries & Mutations
    const { DELETE_MUTATION, PAGINATE_QUERY, UPSERT_MUTATION } =
        await useGraphQLAction(model);

    const {
        closeCrudModal,
        crudActions,
        modalButtonText,
        modalTitle,
        openCreateModal,
        openEditModal,
        openPrintModal,
        openViewModal,
        selectedModel,
        showModal,
    } = useCrudModal(model);

    const {
        loading: queryLoading,
        refetch,
        result,
    } = useQuery(PAGINATE_QUERY, { first: perPage, page: currentPage });

    // GraphQL Mutations
    const { loading: upsertLoading, mutate: upsertMutation } =
        useMutation(UPSERT_MUTATION);
    const { loading: deleteLoading, mutate: deleteMutation } =
        useMutation(DELETE_MUTATION);

    const fetchDataPaginate = async (first: number, page: number) => {
        checkAuthNormal()
            ? ((isLoading.value = true),
              await refetch({ first, page }),
              (isLoading.value = false))
            : console.error('You are not authorized to view.');
    };

    const handleCrudSubmit = async (formData: { [key: string]: any }) => {
        const input = transformGraphQLInputData(formData);

        // TODO: temporary fix for user password
        if (formData.password) {
            const isHashedPassword = formData.password.startsWith('$2y$');
            if (isHashedPassword) delete input.password;
        }

        try {
            isLoading.value = true;
            checkAuth()
                ? (await upsertMutation({ input }),
                  closeCrudModal(),
                  fetchDataPaginate(perPage, currentPage),
                  toasts(
                      `${toTitleCase(singularName)} ${selectedModel.value ? 'updated' : 'created'}.`,
                      { type: 'success' },
                  ))
                : (closeCrudModal(),
                  toasts('You are not authorized to perform this action.', {
                      type: 'warning',
                  }));
            isLoading.value = false;
        } catch (error) {
            handleGraphQLError(
                error,
                selectedModel.value ? 'update' : 'create',
            );
        }
    };

    const deleteModel = async (id: string) => {
        try {
            checkAuth()
                ? ((isLoading.value = true),
                  await deleteMutation({ id: [id] }),
                  (modelData.value = modelData.value.filter(
                      (e: { id: number | string }) => e.id !== id,
                  )),
                  fetchDataPaginate(perPage, currentPage),
                  toasts(`${toTitleCase(singularName)} deleted.`, {
                      type: 'success',
                  }))
                : toasts('You are not authorized to delete.', {
                      type: 'warning',
                  });
            isLoading.value = false;
        } catch (error) {
            handleGraphQLError(error, 'delete');
        }
    };

    const isConfirmModalOpen = ref(false);
    const showDeleteConfirmation = (model: any) => {
        selectedModel.value = model;
        isConfirmModalOpen.value = true;
    };
    const confirmDeletion = async () => {
        isConfirmModalOpen.value = false;
        if (selectedModel.value) {
            await deleteModel(selectedModel.value.id);
            selectedModel.value = null;
        }
    };
    const cancelDeletion = () => (isConfirmModalOpen.value = false);

    const actions = crudActions(
        openViewModal,
        openEditModal,
        openPrintModal,
        showDeleteConfirmation,
    );

    const queryPaginatedData = computed(() => {
        if (result.value) {
            const queryResult = result.value[`${pluralName}Paginate`];
            modelData.value = queryResult.data;
            paginatorInfo.value = queryResult.paginatorInfo;
        }
        return modelData.value;
    });

    const loadingValue = computed(
        () => queryLoading.value || upsertLoading.value || deleteLoading.value,
    );

    // Pagination Functions
    const firstPage = () => {
        if (paginatorInfo.value.lastPage > 1) fetchDataPaginate(perPage, 1);
    };
    const prevPage = () => {
        if (
            paginatorInfo.value.lastPage > 1 &&
            paginatorInfo.value.currentPage > 1
        )
            fetchDataPaginate(paginatorInfo.value.perPage, paginatorInfo.value.currentPage - 1);
    };
    const nextPage = () => {
        if (
            paginatorInfo.value.lastPage > 1 &&
            paginatorInfo.value.currentPage < paginatorInfo.value.lastPage
        )
            fetchDataPaginate(paginatorInfo.value.perPage, paginatorInfo.value.currentPage + 1);
    };
    const lastPage = () => {
        if (paginatorInfo.value.lastPage > 1)
            fetchDataPaginate(paginatorInfo.value.perPage, paginatorInfo.value.lastPage);
    };
    const numberPage = (page: number) => fetchDataPaginate(paginatorInfo.value.perPage, page);
    const handlePerPageChange = async (perPage: number, page: number) => {
        const totalRecords = (await paginatorInfo?.total) || 100000000; // TODO: fix paginator total
        const itemsToFetch = perPage === -1 ? totalRecords : perPage;
        await fetchDataPaginate(itemsToFetch, page);
    };

    const paginationControls = {
        firstPage,
        handlePerPageChange,
        lastPage,
        nextPage,
        numberPage,
        prevPage,
    };

    return {
        actions,
        cancelDeletion,
        closeCrudModal,
        confirmDeletion,
        fetchDataPaginate,
        handleCrudSubmit,
        isConfirmModalOpen,
        isLoading: loadingValue,
        modalButtonText,
        modalFields,
        modalTitle,
        modelData: queryPaginatedData,
        openCreateModal,
        paginationControls,
        paginatorInfo,
        selectedModel,
        showModal,
    };
}
