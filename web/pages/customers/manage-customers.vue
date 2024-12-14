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
                :message="`Delete ${selectedModel?.user.name || name}?`"
                @confirm="confirmDeletion"
                @cancel="cancelDeletion"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField } from '~/types';

import { useModelCrud } from '~/composables/useModelCrud';

const modelName = 'customer';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const icon = 'solar:user-hand-up-linear';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'user.name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: (val) => formatPrice(val.points), label: 'Points' },
    { key: 'created_at', label: 'Created At' },
];

const modelFields: CrudModalField[] = [
    {
        label: 'Customer',
        model: 'User',
        name: 'user_id',
        optionTitle: 'name',
        queryName: 'filterCustomer',
        required: true,
        type: 'combobox',
    },
    { label: 'Phone', name: 'phone', type: 'text' },
    { label: 'Address', name: 'address', type: 'text' },
    { label: 'Points', name: 'points', type: 'text' },
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
            content: 'Add, edit, and delete customers',
            name: 'Manage customers',
        },
    ],
    title: `Manage ${pageTitle.value}`,
});
</script>
