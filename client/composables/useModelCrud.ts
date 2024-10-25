import type { CrudModalField } from '~/types';
import { useGraphQLQuery } from '~/composables/useGraphQLQuery';
import {
    handleGraphQLError,
    transformGraphQLInputData,
} from '~/utils/dataHelper';
import { checkAuth } from '~/utils/authHelpers';

export async function useModelCrud(model: string, fields: CrudModalField[]) {
    const pluralName = getPluralName(model);
    const singularName = getSingularName(model);

    const modelData = ref([]);
    const modalFields = ref(fields);
    const isLoading = ref(false);

    const page = inject('currentPage', 1);
    const perPage = inject('perPage', 50);

    const {
        showModal,
        modalTitle,
        modalButtonText,
        selectedModel,
        openCreateModal,
        openEditModal,
        closeCrudModal,
    } = useCrudModal(model, checkAuth());

    const { PAGINATE_QUERY, UPSERT_MUTATION, DELETE_MUTATION } =
        await useGraphQLQuery(model);

    const {
        result,
        refetch,
        loading: queryLoading,
    } = useQuery(PAGINATE_QUERY, { first: perPage, page: page });

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
                  fetchDataPaginate(perPage, page))
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
                  }))
                : toasts('You are not authorized to delete.', {
                      type: 'warning',
                  });
        } catch (error: any) {
            handleGraphQLError(error, 'delete');
        } finally {
            isLoading.value = false;
        }
    };

    const crudActions = (
        openEditModal: (model: any) => void,
        deleteModel: (id: string) => Promise<void>,
        toasts: (msg: string, opts: any) => void,
    ) => {
        return [
            {
                icon: 'mdi:edit',
                handler: openEditModal,
                class: 'text-blue-500',
            },
            {
                icon: 'mdi:delete',
                handler: async (model: any) => {
                    const confirmed = window.confirm(`Delete ${model.name}?`);
                    confirmed
                        ? await deleteModel(model.id)
                        : toasts('Deletion canceled.', { type: 'warning' });
                },
                class: 'text-red-800',
            },
        ];
    };

    const actions = crudActions(openEditModal, deleteModel, toasts);

    watch(
        () => result.value,
        (newResult) => {
            if (newResult) {
                modelData.value = newResult[`${pluralName}Paginate`].data;
            }
        },
        { immediate: true },
    );

    watch(
        [queryLoading, upsertLoading, deleteLoading],
        ([newQueryLoading, newUpsertLoading, newDeleteLoading]) => {
            isLoading.value =
                newQueryLoading || newUpsertLoading || newDeleteLoading;
        },
    );

    return {
        modelData,
        selectedModel,
        showModal,
        modalTitle,
        modalButtonText,
        modalFields,
        openCreateModal,
        handleCrudSubmit,
        closeCrudModal,
        fetchDataPaginate,
        perPage,
        page,
        isLoading,
        actions,
    };
}
