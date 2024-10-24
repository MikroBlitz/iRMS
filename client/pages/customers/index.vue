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
                        :on-refresh="() => fetchDataPaginate(perPage, page)"
                    />
                </template>
            </TableHeader>

            <TableContent
                :headers="modelHeaders"
                :is-loading="isLoading"
                :data="modelData"
                :actions="actions"
                :paginator-info="paginatorInfo"
                @page-change="handlePageChange"
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

const modelName = 'customer';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'mdi:package-variant-closed';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    {
        key: (val) =>
            val.user?.complete_name ? val.user.complete_name : val.name,
        label: 'Name',
    },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: (val) => formatPrice(val.points), label: 'Points' },
];

const modelFields: CrudModalField[] = [
    {
        name: 'name',
        label: 'Name (optional: for no customer account)',
        type: 'text',
    },
    {
        name: 'user_id',
        label: 'Customer Account',
        type: 'select',
        model: 'User',
        queryName: 'filterCustomer',
        optionTitle: 'complete_name',
    },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'points', label: 'Points', type: 'text' },
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
    page,
    isLoading,
    actions,
    paginatorInfo,
} = await useModelCrud(modelName, modelFields);

const handlePageChange = (page: number) => {
    fetchDataPaginate(paginatorInfo.value.perPage, page);
    console.log(fetchDataPaginate(paginatorInfo.value.perPage, page));
};

onMounted(() => {
    fetchDataPaginate(perPage, page);
});
</script>
