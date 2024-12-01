import type { PaginatorInfo, CrudModalField } from '~/types'

import { useCrudModal } from '~/composables/useCrudModal'
import { useGraphQLQuery } from '~/composables/useGraphQLQuery'
import { checkAuth } from '~/utils/authHelpers'
import {
    handleGraphQLError,
    transformGraphQLInputData,
} from '~/utils/dataHelper'
import {
    getPluralName,
    getSingularName,
    toTitleCase,
} from '~/utils/textHelpers'

export async function useModelCrud(model: string, fields: CrudModalField[]) {
    const pluralName = getPluralName(model)
    const singularName = getSingularName(model)

    const modelData = ref([])
    const modalFields = ref(fields)
    const isLoading = ref(false)

    const paginatorInfo: any = ref<PaginatorInfo>()
    const currentPage: number = paginatorInfo.value?.currentPage || 1
    const perPage: number = paginatorInfo.value?.perPage || 10

    const {
        closeCrudModal,
        modalButtonText,
        modalTitle,
        openCreateModal,
        openEditModal,
        openPrintModal,
        openViewModal,
        selectedModel,
        showModal,
    } = useCrudModal(model, checkAuth())

    // GraphQL Dynamic Queries & Mutations
    const { DELETE_MUTATION, PAGINATE_QUERY, UPSERT_MUTATION } =
        await useGraphQLQuery(model)

    const {
        loading: queryLoading,
        refetch,
        result,
    } = useQuery(PAGINATE_QUERY, { first: perPage, page: currentPage })

    // GraphQL Mutations
    const { loading: upsertLoading, mutate: upsertMutation } =
        useMutation(UPSERT_MUTATION)
    const { loading: deleteLoading, mutate: deleteMutation } =
        useMutation(DELETE_MUTATION)

    const fetchDataPaginate = async (first: number, page: number) => {
        checkAuth()
            ? ((isLoading.value = true),
              await refetch({ first, page }),
              (isLoading.value = false))
            : // toasts('You are not authorized to view.', { type: 'warning' })
              console.error('You are not authorized to view.')
    }

    const handleCrudSubmit = async (formData: any) => {
        const input = transformGraphQLInputData(formData)

        try {
            isLoading.value = true
            checkAuth()
                ? (await upsertMutation({ input }),
                  toasts(
                      `${toTitleCase(singularName)} ${selectedModel.value ? 'updated' : 'created'}.`,
                      { type: 'success' },
                  ),
                  closeCrudModal(),
                  fetchDataPaginate(perPage, currentPage))
                : toasts('You are not authorized to perform this action.', {
                      type: 'warning',
                  })
        } catch (error: any) {
            handleGraphQLError(error, selectedModel.value ? 'update' : 'create')
        } finally {
            isLoading.value = false
        }
    }

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
                  })
        } catch (error: any) {
            handleGraphQLError(error, 'delete')
        } finally {
            isLoading.value = false
        }
    }
    const isConfirmModalOpen = ref(false)
    const showDeleteConfirmation = (model: any) => {
        selectedModel.value = model
        isConfirmModalOpen.value = true
    }
    const confirmDeletion = async () => {
        isConfirmModalOpen.value = false
        if (selectedModel.value) {
            await deleteModel(selectedModel.value.id)
            selectedModel.value = null
        }
    }
    const cancelDeletion = () => {
        isConfirmModalOpen.value = false
    }

    const crudActions = (
        openViewModal: (model: any) => void,
        openEditModal: (model: any) => void,
        openPrintModal: (model: any) => void,
    ) => {
        return [
            {
                class: 'text-yellow-500',
                handler: openViewModal,
                icon: 'solar:eye-outline',
                name: 'view',
                showButton: false,
            },
            {
                class: 'text-blue-500',
                handler: openEditModal,
                icon: 'solar:pen-line-duotone',
                name: 'edit',
                showButton: true,
            },
            {
                class: 'text-destructive',
                handler: showDeleteConfirmation,
                icon: 'solar:trash-bin-minimalistic-outline',
                name: 'delete',
                showButton: true,
            },
            {
                class: 'text-blue-500',
                handler: openPrintModal,
                icon: 'solar:printer-line-duotone',
                name: 'print',
                showButton: false,
            },
        ]
    }

    const actions = crudActions(openViewModal, openEditModal, openPrintModal)

    const queryPaginatedData = computed(() => {
        if (result.value) {
            const queryResult = result.value[`${pluralName}Paginate`]
            modelData.value = queryResult.data
            paginatorInfo.value = queryResult.paginatorInfo
        }
        return modelData.value
    })

    const loadingValue = computed(
        () => queryLoading.value || upsertLoading.value || deleteLoading.value,
    )

    const firstPage = () => {
        fetchDataPaginate(perPage, 1)
    }
    const prevPage = () => {
        fetchDataPaginate(perPage, paginatorInfo.value.currentPage - 1)
    }
    const nextPage = () => {
        fetchDataPaginate(perPage, paginatorInfo.value.currentPage + 1)
    }
    const lastPage = () => {
        fetchDataPaginate(perPage, paginatorInfo.value.lastPage)
    }
    const numberPage = (page: number) => {
        fetchDataPaginate(perPage, page)
    }

    const paginationControls = {
        firstPage,
        lastPage,
        nextPage,
        numberPage,
        prevPage,
    }

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
    }
}
