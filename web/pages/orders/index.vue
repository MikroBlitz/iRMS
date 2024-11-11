<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="pageTitle" :icon="icon">
                <template #actions>
                    <TableCRUD
                        :on-refresh="
                            () => fetchDataPaginate(perPage, currentPage)
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
            />

            <ModalView
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

definePageMeta({
    layout: 'app-layout',
});

const modelName = 'order';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'solar:cart-outline';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: (val) => toBasicDateTime(val.date), label: 'Date' },
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
        key: (val) => {
            const paymentTypes: Record<number, string> = {
                0: 'Cash',
                1: 'Gcash',
                2: 'Bank Transfer',
            };
            return paymentTypes[val.payment];
        },
        label: 'Payment',
    },
    { key: (val) => currencyFormat(val.total_amount), label: 'Total Amount' },
    {
        key: (val) => {
            const statusTypes: Record<number, string> = {
                0: 'Completed',
                1: 'On-Hold',
                2: 'Cancelled',
            };
            return statusTypes[val.status];
        },
        label: 'Status',
    },
];

const modelFields: CrudModalField[] = [];

const {
    modelData,
    fetchDataPaginate,
    perPage,
    currentPage,
    showModal,
    modalTitle,
    selectedModel,
    closeCrudModal,
    isLoading,
    actions,
    paginatorInfo,
} = await useModelCrud(modelName, modelFields);

const customActions = actions.map((action) => {
    action.name === 'delete' || action.name === 'edit'
        ? (action.showButton = false)
        : null;
    action.name === 'print' ? (action.showButton = true) : null;
    return action;
});
</script>
