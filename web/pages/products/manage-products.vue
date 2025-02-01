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
                @submit="handleSubmit"
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
import type { Headers, CrudModalField, Stock } from '~/types';

const modelName = 'product';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const icon = 'solar:shop-linear';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'po_unit', label: 'PO Unit' },
    { key: 'category.name', label: 'Category' },
    {
        key: (val) =>
            val.inventories
                ? val.inventories
                      .map(
                          (stock: Stock) =>
                              `${stock.location} ( ${thousandSeparator(stock.qty ?? 0)} ${val.po_unit || ''} )`,
                      )
                      .join(', ') || 'No Stocks Found!'
                : 'Error Fetching Inventory!',
        label: 'Stock',
    },
    { key: 'sku', label: 'SKU' },
    { key: (item) => `${currencyFormat(item.price)}`, label: 'Price' },
    // { key: 'description', label: 'Description' },
    { key: 'created_at', label: 'Created At' },
];

const modelFields: CrudModalField[] = [
    {
        label: 'Category',
        model: 'Category',
        name: 'category_id',
        optionTitle: 'name',
        queryName: 'categoryFilter',
        type: 'combobox',
    },
    { label: 'Name*', name: 'name', required: true, type: 'text' },
    {
        class: 'col-span-4',
        label: 'PO Unit (ex: pcs, kg, etc.)',
        name: 'po_unit',
        type: 'text',
    },
    {
        class: 'col-span-4',
        label: 'SKU*',
        name: 'sku',
        required: true,
        type: 'text',
    },
    { class: 'col-span-4', label: 'Price', name: 'price', type: 'text' },
    { class: 'col-span-8', label: 'Image URL', name: 'image', type: 'text' },
    {
        class: 'col-span-12',
        label: 'Description',
        name: 'description',
        type: 'textarea',
    },
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

const handleSubmit = async (formData: any) => {
    if (formData.price) {
        formData.price = parseFloat(formData.price);
    }
    handleCrudSubmit(formData);
};

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Add, edit, and delete products',
            name: 'Manage products',
        },
    ],
    title: `Manage ${pageTitle.value}`,
});
</script>
