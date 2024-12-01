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
import type { Headers, CrudModalField } from '~/types'

import { useModelCrud } from '~/composables/useModelCrud'

const modelName = 'order'
const pageTitle = ref(getPluralName(toTitleCase(modelName)))
const icon = 'solar:cart-outline'

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
            }
            return paymentTypes[val.payment]
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
            }
            return statusTypes[val.status]
        },
        label: 'Status',
    },
    { key: 'created_at', label: 'Created At' },
]

const modelFields: CrudModalField[] = []

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
} = await useModelCrud(modelName, modelFields)

const customActions = actions.map((action) => {
    action.name === 'delete' || action.name === 'edit'
        ? (action.showButton = false)
        : null
    action.name === 'print' ? (action.showButton = true) : null
    return action
})

definePageMeta({
    layout: 'app-layout',
})

useHead({
    meta: [
        {
            content: 'Add, edit, and delete orders',
            name: 'Manage orders',
        },
    ],
    title: pageTitle.value,
})
</script>
