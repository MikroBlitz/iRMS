import { checkAuth } from '~/utils/authHelpers';

export function useCrudModal(model: string, auth: boolean) {
    const capitalizedName = getCapSingularName(model);

    const showModal = ref(false);
    const modalTitle = ref(`Create ${model}`);
    const modalButtonText = ref('Create');
    const selectedModel = ref(null);

    const openCreateModal = () => {
        checkAuth()
            ? ((selectedModel.value = null),
              (modalTitle.value = `Create ${capitalizedName}`),
              (modalButtonText.value = 'Create'),
              (showModal.value = true))
            : toasts('You are not authorized to create.', { type: 'warning' });
    };

    const openEditModal = (model: any) => {
        checkAuth()
            ? ((selectedModel.value = model),
              (modalTitle.value = `Edit ${capitalizedName}`),
              (modalButtonText.value = 'Update'),
              (showModal.value = true))
            : toasts('You are not authorized to edit.', { type: 'warning' });
    };

    const closeCrudModal = () => {
        showModal.value = false;
    };

    return {
        showModal,
        modalTitle,
        modalButtonText,
        selectedModel,
        openCreateModal,
        openEditModal,
        closeCrudModal,
    };
}
