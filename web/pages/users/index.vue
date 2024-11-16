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
                :first-page="firstPage"
                :prev-page="prevPage"
                :next-page="nextPage"
                :last-page="lastPage"
                :number-page="numberPage"
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

            <ModalConfirm
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
import type { CrudModalField, Headers } from '~/types';

definePageMeta({
    layout: 'app-layout',
});

const modelName = 'user';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'solar:user-circle-linear';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    {
        key: (val) => {
            switch (val.role) {
                case 0:
                    return 'User';
                case 1:
                    return 'Admin';
                case 2:
                    return 'Staff';
                case 3:
                    return 'Store Manager';
                default:
                    return 'Unknown';
            }
        },
        label: 'Role',
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
];

const modelFields: CrudModalField[] = [
    { name: 'role', label: 'Role', type: 'roleSelect' },
    { name: 'first_name', label: 'First Name', type: 'text', required: true },
    { name: 'middle_name', label: 'Middle Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password' },
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
    firstPage,
    prevPage,
    nextPage,
    lastPage,
    numberPage,
} = await useModelCrud(modelName, modelFields);
</script>
