<template>
    <div>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="pageTitle" :icon="icon">
                <template #actions>
                    <TableCRUD
                        :on-refresh="
                            () =>
                                fetchDataPaginate(
                                    paginatorInfo.perPage,
                                    paginatorInfo.currentPage,
                                )
                        "
                        :disabled-buttons="['create']"
                    />
                </template>
            </TableHeader>

            <TableContent
                :headers="modelHeaders"
                :is-loading="isLoading"
                :data="modelData"
                :actions="customActions"
                :paginator-info="paginatorInfo"
                :pagination-controls="paginationControls"
            />

            <ModalOrderView
                v-if="showModal"
                :visible="showModal"
                :title="modalTitle"
                :data="selectedModel"
                @close="closeCrudModal"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField } from '~/types';

import { useModelCrud } from '~/composables/useModelCrud';
import { OrderStatus } from '~/types/codegen/graphql';

const modelName = 'order';
const pageTitle = ref(getPluralName(toTitleCase(modelName)));
const icon = 'solar:cart-outline';

// Custom Styles in tables
const statusClasses: Record<OrderStatus, string> = {
    [OrderStatus.Cancelled]:
        'bg-red-50 text-red-700 border border-red-700 dark:bg-red-900 dark:text-white dark:border-red-500',
    [OrderStatus.Completed]:
        'bg-emerald-50 text-emerald-700 border border-emerald-700 dark:bg-emerald-900 dark:text-white dark:border-emerald-500',
    [OrderStatus.OnHold]:
        'bg-yellow-50 text-yellow-700 border border-yellow-700 dark:bg-yellow-900 dark:text-white dark:border-yellow-500',
};

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    {
        key: (val) =>
            `<span class="bg-secondary px-3 py-1 rounded-lg text-xs font-bold">${val.transaction_number}</span>`,
        label: 'Transaction Number',
    },
    {
        key: (val) => (val.customer_guest ? '*******' : 'Guest'),
        label: 'Customer',
    },
    {
        key: (val) =>
            val.order_items
                .map((item: any) => `${item.product.name}(${item.qty})`)
                .join(', '),
        label: 'Items (Qty)',
    },
    {
        key: (val) => transformStringEnumsToTitleKeys(val.payment),
        label: 'Payment',
    },
    { key: (val) => currencyFormat(val.total_amount), label: 'Total Amount' },
    {
        key: (val) => {
            const statusCLass = statusClasses[val.status as OrderStatus];
            return `<span class="inline-block px-3 py-1 rounded-lg text-xs ${statusCLass}">${transformStringEnumsToTitleKeys(val.status)}</span>`;
        },
        label: 'Status',
    },
    { key: (val) => toBasicDateTime(val.date), label: 'Date' },
];

const modelFields: CrudModalField[] = [];

const {
    actions,
    closeCrudModal,
    fetchDataPaginate,
    isLoading,
    modalTitle,
    modelData,
    paginationControls,
    paginatorInfo,
    selectedModel,
    showModal,
} = await useModelCrud(modelName, modelFields);

const customActions = actions.map((action) => {
    action.name === 'delete' || action.name === 'edit'
        ? (action.showButton = false)
        : null;
    action.name === 'view' ? (action.showButton = true) : null;
    return action;
});

definePageMeta({
    layout: 'app-layout',
});

useHead({
    meta: [
        {
            content: 'Add, edit, and delete orders',
            name: 'Manage orders',
        },
    ],
    title: pageTitle.value,
});
</script>
