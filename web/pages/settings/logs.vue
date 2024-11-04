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
        </main>
    </div>
</template>

<script setup lang="ts">
import type { Headers, CrudModalField } from '~/types';
import { useModelCrud } from '~/composables/useModelCrud';

definePageMeta({
    layout: 'app-layout',
});

const modelName = 'log';
const pageTitle = getPluralName(toTitleCase(modelName));
const icon = 'mdi:blog';

const modelHeaders: Headers[] = [
    { key: 'id', label: 'ID' },
    { key: (val) => convertToBasicDateTime(val.created_at), label: 'Date' },
    { key: 'user.name', label: 'User' },
    { key: 'event', label: 'Event' },
    { key: 'ip_address', label: 'IP' },
    { key: 'browser', label: 'Browser' },
];

const modelFields: CrudModalField[] = [];

const {
    modelData,
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
