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
                @submit="handleSubmit"
                @close="closeCrudModal"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField, Stock } from '~/types';

definePageMeta({
    layout: 'app-layout',
});

const modelName = 'product';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'mdi:storefront';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'sku', label: 'SKU' },
    { key: 'category.name', label: 'Category' },
    {
        key: (val) =>
            val.inventories
                ? val.inventories
                      .map(
                          (stock: Stock) =>
                              `${stock.location} (${thousandSeparator(stock.qty ?? 0)})`,
                      )
                      .join(', ') || 'No Stocks Found!'
                : 'Error Fetching Inventory!',
        label: 'Stock',
    },
    { key: (item) => `${currencyFormat(item.price)}`, label: 'Price' },
    { key: 'description', label: 'Description' },
];

const modelFields: CrudModalField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    {
        name: 'category_id',
        label: 'Category',
        type: 'select',
        model: 'Category',
        queryName: 'categoryFilter',
        optionTitle: 'name',
    },
    { name: 'image', label: 'Image URL', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'sku', label: 'SKU', type: 'text' },
    { name: 'price', label: 'Price', type: 'text' },
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

const handleSubmit = async (formData: any) => {
    if (formData.price) {
        formData.price = parseFloat(formData.price);
    }
    handleCrudSubmit(formData);
};

onMounted(() => {
    fetchDataPaginate(perPage, page);
});
</script>
