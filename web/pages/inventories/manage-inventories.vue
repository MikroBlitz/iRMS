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
                :message="`Delete ${selectedModel?.product.name || modelName.name}?`"
                @confirm="confirmDeletion"
                @cancel="cancelDeletion"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField } from '~/types';

import { useModelCrud } from '~/composables/useModelCrud';
import { thousandSeparator } from '~/utils/numberHelpers';

const modelName = 'inventory';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const icon = 'solar:box-minimalistic-linear';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'product.name', label: 'Product' },
    {
        key: (val) => {
            const qty = val.qty;
            let bgColor = '';
            // TODO: change this if low stocks is implemented
            if (qty <= 10) {
                bgColor =
                    'bg-red-50 text-red-700 border border-red-700 animate-pulse dark:bg-red-900 dark:text-white dark:border-red-400';
            } else if (qty <= 30) {
                bgColor =
                    'bg-yellow-50 text-yellow-700 border border-yellow-700 dark:bg-yellow-900 dark:text-white dark:border-yellow-400';
            } else {
                bgColor =
                    'bg-emerald-50 text-emerald-700 border border-emerald-700 dark:bg-emerald-900 dark:text-white dark:border-emerald-400';
            }

            return `<span class="inline-block px-3 py-1 rounded-full text-xs ${bgColor}">${thousandSeparator(qty)} ${val.product.po_unit || 'unit'}</span>`;
        },
        label: 'Stocks',
    },
    { key: 'location', label: 'Location' },
    { key: 'created_at', label: 'Created At' },
];

const modelFields: CrudModalField[] = [
    {
        label: 'Product *',
        model: 'Product',
        name: 'product_id',
        optionTitle: 'name',
        queryName: 'productFilter',
        required: true,
        type: 'combobox',
    },
    { label: 'Stocks *', name: 'qty', required: true, type: 'number' },
    { label: 'Location', name: 'location', type: 'text' },
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
            content: 'Add, edit, and delete inventories',
            name: 'Manage inventories',
        },
    ],
    title: `Manage ${pageTitle.value}`,
});
</script>
