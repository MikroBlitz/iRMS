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

            <TableConfirmationModal
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
import type { Headers, CrudModalField } from '~/types';
import { useModelCrud } from '~/composables/useModelCrud';

definePageMeta({
    layout: 'app-layout',
});

const modelName = 'category';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'solar:filter-outline';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
];

const modelFields: CrudModalField[] = [
    { name: 'name', label: 'Name *', type: 'text', required: true },
    { name: 'slug', label: 'Slug *', type: 'text', required: true },
];

const {
    modelData,
    selectedModel,
    showModal,
    modalTitle,
    modalButtonText,
    modalFields,
    openCreateModal,
    isConfirmModalOpen,
    confirmDeletion,
    cancelDeletion,
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
