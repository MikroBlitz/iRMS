import type { PaginatorInfo, CrudModalField } from '~/types';

import { useCrudModal } from '~/composables/useCrudModal';
import { useGraphQLQuery } from '~/composables/useGraphQLQuery';
import { checkAuth } from '~/utils/authHelpers';
import {
    handleGraphQLError,
    transformGraphQLInputData,
} from '~/utils/dataHelper';
import {
    getPluralName,
    getSingularName,
    toTitleCase,
} from '~/utils/textHelpers';

export async function useModelCrud(model: string, fields: CrudModalField[]) {
    const pluralName = getPluralName(model);
    const singularName = getSingularName(model);

    const modelData = ref([]);
    const modalFields = ref(fields);
    const isLoading = ref(false);

    const currentPage: number = 1;
    const perPage: number = 50;
    const paginatorInfo = ref<PaginatorInfo>();

    const {
        showModal,
        modalTitle,
        modalButtonText,
        selectedModel,
        openCreateModal,
        openViewModal,
        openEditModal,
        closeCrudModal,
        printModal,
    } = useCrudModal(model, checkAuth());

    // GraphQL Dynamic Queries & Mutations
    const { PAGINATE_QUERY, UPSERT_MUTATION, DELETE_MUTATION } =
        await useGraphQLQuery(model);

    const {
        result,
        refetch,
        loading: queryLoading,
    } = useQuery(PAGINATE_QUERY, { first: perPage, page: currentPage });

    // GraphQL Mutations
    const { mutate: upsertMutation, loading: upsertLoading } =
        useMutation(UPSERT_MUTATION);
    const { mutate: deleteMutation, loading: deleteLoading } =
        useMutation(DELETE_MUTATION);

    const fetchDataPaginate = async (first: number, page: number) => {
        checkAuth()
            ? ((isLoading.value = true),
              await refetch({ first, page }),
              (isLoading.value = false))
            : toasts('You are not authorized to view.', { type: 'warning' });
    };

    const handleCrudSubmit = async (formData: any) => {
        const input = transformGraphQLInputData(formData);

        try {
            isLoading.value = true;
            checkAuth()
                ? (await upsertMutation({ input }),
                  toasts(
                      `${toTitleCase(singularName)} ${selectedModel.value ? 'updated' : 'created'}.`,
                      { type: 'success' },
                  ),
                  closeCrudModal(),
                  fetchDataPaginate(perPage, currentPage))
                : toasts('You are not authorized to create.', {
                      type: 'warning',
                  });
        } catch (error: any) {
            handleGraphQLError(
                error,
                selectedModel.value ? 'update' : 'create',
            );
        } finally {
            isLoading.value = false;
        }
    };

    const deleteModel = async (id: string) => {
        try {
            checkAuth()
                ? ((isLoading.value = true),
                  await deleteMutation({ id: [id] }),
                  (modelData.value = modelData.value.filter(
                      (e: any) => e.id !== id,
                  )),
                  toasts(`${toTitleCase(singularName)} deleted.`, {
                      type: 'success',
                  }),
                  fetchDataPaginate(perPage, currentPage))
                : toasts('You are not authorized to delete.', {
                      type: 'warning',
                  });
        } catch (error: any) {
            handleGraphQLError(error, 'delete');
        } finally {
            isLoading.value = false;
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
    const cancelDeletion = () => {
        isConfirmModalOpen.value = false;
    };

    const crudActions = (
        openViewModal: (model: any) => void,
        openEditModal: (model: any) => void,
        printModal: (model: any) => void,
    ) => {
        return [
            {
                name: 'view',
                icon: 'solar:eye-outline',
                handler: openViewModal,
                class: 'text-yellow-500',
                showButton: true,
            },
            {
                name: 'edit',
                icon: 'solar:pen-line-duotone',
                handler: openEditModal,
                class: 'text-blue-500',
                showButton: true,
            },
            {
                name: 'delete',
                icon: 'solar:trash-bin-minimalistic-outline',
                handler: showDeleteConfirmation,
                class: 'text-red-800',
                showButton: true,
            },
            {
                name: 'print',
                icon: 'solar:printer-line-duotone',
                handler: printModal,
                class: 'text-blue-500',
                showButton: false,
            },
        ];
    };

    const actions = crudActions(openViewModal, openEditModal, printModal);

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

    return {
        actions,
        cancelDeletion,
        closeCrudModal,
        confirmDeletion,
        currentPage,
        fetchDataPaginate,
        handleCrudSubmit,
        isConfirmModalOpen,
        isLoading: loadingValue,
        modalButtonText,
        modalFields,
        modalTitle,
        modelData: queryPaginatedData,
        openCreateModal,
        perPage,
        paginatorInfo,
        selectedModel,
        showModal,
    };
}
