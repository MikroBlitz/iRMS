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
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField } from '~/types'
import { useModelCrud } from '~/composables/useModelCrud'

const modelName = 'log'
const pageTitle = ref(getPluralName(toTitleCase(modelName)))
const icon = 'mdi:blog'

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'event', label: 'Event' },
    { key: (val) => toBasicDateTime(val.created_at), label: 'Date' },
    { key: 'user.name', label: 'User' },
    { key: 'ip_address', label: 'IP' },
    { key: 'browser', label: 'Browser' },
]

const modelFields: CrudModalField[] = []

const {
    actions,
    fetchDataPaginate,
    isLoading,
    modelData,
    paginationControls,
    paginatorInfo,
} = await useModelCrud(modelName, modelFields)

const customActions = actions.map((action) => {
    action.name === 'edit' || action.name === 'delete'
        ? (action.showButton = false)
        : null
    action.name === 'view' ? (action.showButton = true) : null
    return action
})

definePageMeta({
    layout: 'app-layout',
})

useHead({
    meta: [
        {
            content: 'View logs',
            name: 'Manage logs',
        },
    ],
    title: pageTitle.value,
})
</script>
