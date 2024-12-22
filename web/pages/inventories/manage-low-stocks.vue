<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="`Manage ${pageTitle}`" :icon="icon">
                <template #actions>
                    <TableCRUD
                        :on-create="openCreateModal"
                        :on-refresh="() => refetch()"
                    />
                </template>
            </TableHeader>

            <TableContent
                :headers="modelHeaders"
                :is-loading="isLoading"
                :data="queryData"
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

import { lowStocksInventories } from '~/graphql/Inventory';

const modelName = 'critical stock';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const icon = 'mdi:garage-warning';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'product.name', label: 'Product' },
    { key: (val) => `${thousandSeparator(val.qty)} pc/s`, label: 'Stocks' },
    { key: 'location', label: 'Location' },
    { key: 'updated_at', label: 'Updated At' },
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
    handleCrudSubmit,
    isConfirmModalOpen,
    isLoading,
    modalButtonText,
    modalFields,
    modalTitle,
    openCreateModal,
    paginationControls,
    paginatorInfo,
    selectedModel,
    showModal,
} = await useModelCrud('inventory', modelFields);

const { refetch, result } = useQuery(lowStocksInventories);
const queryData = ref([]);

if (result.value && result.value.lowStocksInventories) {
    queryData.value = result.value.lowStocksInventories;
}

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Add, edit, and delete stocks',
            name: 'Manage low stocks items',
        },
    ],
    title: `Manage ${pageTitle.value}`,
});
</script>
