import { toasts } from '~/composables/useToast';

export function useCrudModal(model: string) {
    const capitalizedName = getCapSingularName(model);

    const showModal = ref(false);
    const modalTitle = ref(`Add ${model}`);
    const modalButtonText = ref('Create');
    const selectedModel = ref(null as any);

    const closeCrudModal = () => {
        showModal.value = false;
    };

    const openCreateModal = () => {
        viewOnly()
            ? ((selectedModel.value = null),
              (modalTitle.value = `Add new ${capitalizedName}`),
              (showModal.value = true))
            : toasts('You are not authorized to create.', { type: 'warning' });
    };

    const openViewModal = (model: any) => {
        viewOnly()
            ? ((selectedModel.value = model),
              (modalTitle.value = `View ${capitalizedName}`),
              (modalButtonText.value = ''),
              (showModal.value = true))
            : toasts('You are not authorized to view.', { type: 'warning' });
    };

    const openEditModal = (model: any) => {
        viewOnly()
            ? ((selectedModel.value = model),
              (modalTitle.value = `Edit ${capitalizedName}`),
              (modalButtonText.value = 'Update'),
              (showModal.value = true))
            : toasts('You are not authorized to edit.', { type: 'warning' });
    };

    const openPrintModal = (model: any) => {
        checkAuth()
            ? ((selectedModel.value = model),
              (modalTitle.value = `Print ${capitalizedName}`),
              (modalButtonText.value = 'Print'),
              (showModal.value = true))
            : toasts('You are not authorized to print.', { type: 'warning' });
    };

    const crudActions = (
        openViewModal: (model: any) => void,
        openEditModal: (model: any) => void,
        openPrintModal: (model: any) => void,
        showDeleteConfirmation: (model: any) => void,
    ) => {
        return [
            {
                class: 'text-yellow-700',
                handler: openViewModal,
                icon: 'solar:eye-outline',
                name: 'view',
                showButton: false,
            },
            {
                class: 'text-emerald-700',
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
                class: 'text-blue-700',
                handler: openPrintModal,
                icon: 'solar:printer-line-duotone',
                name: 'print',
                showButton: false,
            },
        ];
    };

    return {
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
    };
}
