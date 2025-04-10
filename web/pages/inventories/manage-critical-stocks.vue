<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="`Manage ${pageTitle}`" :icon="icon">
                <template #actions>
                    <TableCRUD
                        :disabled-buttons="['create']"
                        :on-create="nonFunc"
                        :on-refresh="() => refetch()"
                    />
                </template>
            </TableHeader>

            <TableContent
                :headers="modelHeaders"
                :is-loading="isLoading"
                :data="modelData"
                :actions="customActions"
                :paginator-info="nonFunc"
                :pagination-controls="nonFunc"
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
    {
        key: (val) => {
            const qty = val.qty;

            return `<span
                        class="inline-block px-2 py-0.5 rounded-lg text-xs bg-red-50 text-red-700 border border-red-700 animate-pulse dark:bg-red-900 dark:text-white dark:border-red-400"
                    >
                        ${thousandSeparator(qty)} ${val.product.po_unit || 'unit'}
                    </span>`;
        },
        label: 'Stocks',
    },
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
];

const nonFunc = () => {};

const {
    actions,
    closeCrudModal,
    handleCrudSubmit,
    modalButtonText,
    modalFields,
    modalTitle,
    selectedModel,
    showModal,
} = await useModelCrud('inventory', modelFields);

const {
    loading: isLoading,
    refetch,
    result: data,
} = useQuery(lowStocksInventories);

const customActions = actions.map((action) => {
    action.name === 'delete' ? (action.showButton = false) : null;
    action.name === 'edit' ? (action.showButton = true) : null;
    return action;
});

const modelData = computed(() =>
    data.value ? data.value.lowStocksInventories : [],
);

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
