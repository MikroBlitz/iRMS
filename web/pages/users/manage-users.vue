<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="`Manage ${pageTitle}`" :icon="icon">
                <template #actions>
                    <TableCRUD
                        :on-create="openCreateModal"
                        :on-refresh="
                            () =>
                                fetchDataPaginate(
                                    paginatorInfo.perPage,
                                    paginatorInfo.currentPage,
                                )
                        "
                    />
                </template>
            </TableHeader>

            <TableContent
                :headers="modelHeaders"
                :is-loading="isLoading"
                :data="modelData"
                :actions="actions"
                :paginator-info="paginatorInfo"
                :pagination-controls="paginationControls"
            />

            <ModalCRUD
                v-if="showModal"
                :visible="showModal"
                :title="modalTitle"
                :fields="modalFields"
                :initial-values="selectedModel"
                :submit-button-text="modalButtonText"
                @submit="handleCrudSubmit"
                @close="closeCrudModal"
            />

            <ModalConfirm
                v-if="isConfirmModalOpen"
                :is-open="isConfirmModalOpen"
                title="Confirm Deletion"
                :message="`Delete ${selectedModel?.name || modelName.name}?`"
                @confirm="confirmDeletion"
                @cancel="cancelDeletion"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { CrudModalField, Headers } from '~/types';

const modelName = 'user';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const icon = 'solar:user-circle-linear';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    {
        key: (val) => {
            switch (val.role) {
                case 0:
                    return 'User';
                case 1:
                    return 'Admin';
                case 2:
                    return 'Staff';
                case 3:
                    return 'Store Manager';
                default:
                    return 'Unknown';
            }
        },
        label: 'Role',
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'created_at', label: 'Created At' },
];

const modelFields: CrudModalField[] = [
    { label: 'Role', name: 'role', type: 'roleSelect' },
    { label: 'First Name', name: 'first_name', required: true, type: 'text' },
    { label: 'Middle Name', name: 'middle_name', type: 'text' },
    { label: 'Last Name', name: 'last_name', required: true, type: 'text' },
    { label: 'Email', name: 'email', required: true, type: 'email' },
    { label: 'Password', name: 'password', type: 'password' },
];

const {
    actions,
    cancelDeletion,
    closeCrudModal,
    confirmDeletion,
    fetchDataPaginate,
    handleCrudSubmit,
    isConfirmModalOpen,
    isLoading,
    modalButtonText,
    modalFields,
    modalTitle,
    modelData,
    openCreateModal,
    paginationControls,
    paginatorInfo,
    selectedModel,
    showModal,
} = await useModelCrud(modelName, modelFields);

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Add, edit, and delete users',
            name: 'Manage users',
        },
    ],
    title: `Manage ${pageTitle.value}`,
});
</script>
