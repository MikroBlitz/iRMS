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

definePageMeta({
    layout: 'app-layout',
});

const modelName = 'order';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'mdi:cart-outline';

const modelHeaders: Headers[] = [
    // { key: 'id', label: 'ID' },
    { key: (val) => convertToBasicDateTime(val.date), label: 'Date' },
    {
        key: 'customer_guest',
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
    { key: (val) => currencyFormat(val.cash_tendered), label: 'Cash Tendered' },
    { key: (val) => currencyFormat(val.change), label: 'Change' },
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
    selectedModel,
    showModal,
    modalTitle,
    modalButtonText,
    modalFields,
    handleCrudSubmit,
    closeCrudModal,
    fetchDataPaginate,
    perPage,
    currentPage,
    isLoading,
    actions,
    paginatorInfo,
} = await useModelCrud(modelName, modelFields);

onMounted(async () => {
    await fetchDataPaginate(perPage, currentPage);
});
</script>
