<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="pageTitle" :icon="icon">
                <template #actions>
                    <TableCRUD
                        :on-create="openCreateModal"
                        :on-refresh="
                            () => fetchDataPaginate(perPage, currentPage)
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
            />

            <TableCrudModal
                v-if="showModal"
                :visible="showModal"
                :title="modalTitle"
                :fields="modalFields"
                :initial-values="selectedModel"
                :submit-button-text="modalButtonText"
                @submit="handleCrudSubmit"
                @close="closeCrudModal"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField } from '~/types';
import { useModelCrud } from '~/composables/useModelCrud';
import { thousandSeparator } from '~/utils/numberHelpers';

definePageMeta({
    layout: 'app-layout',
});

const modelName = 'inventory';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'mdi:package-variant-closed';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'product.name', label: 'Product' },
    { key: (val) => `${thousandSeparator(val.qty)} pc/s`, label: 'Stocks' },
    { key: 'location', label: 'Location' },
];

const modelFields: CrudModalField[] = [
    {
        name: 'product_id',
        label: 'Product *',
        type: 'combobox',
        required: true,
        model: 'Product',
        queryName: 'productFilter',
        optionTitle: 'name',
    },
    { name: 'qty', label: 'Stocks *', type: 'number', required: true },
    { name: 'location', label: 'Location', type: 'text' },
];

const {
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
    currentPage,
    isLoading,
    actions,
    paginatorInfo,
} = await useModelCrud(modelName, modelFields);
</script>
