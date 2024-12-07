<template>
    <div>
        <div
            class="w-full rounded-b-lg p-2 bg-card border border-secondary dark:border-primary"
        >
            <Datatable
                :options="options"
                :columns="formattedColumns"
                :data="props.data"
                class="overflow-auto w-full"
            >
                <template #actions="{ cellData }">
                    <div class="flex justify-end items-center">
                        <Button
                            v-for="(action, index) in actions"
                            v-show="action.showButton"
                            :key="index"
                            :disabled="!action.showButton"
                            variant="ghost"
                            class="mx-0.5 rounded-full"
                            :class="action.class"
                            size="icon"
                            @click="action.handler(cellData)"
                        >
                            <Icon :name="action.icon" size="22" />
                        </Button>
                    </div>
                </template>
            </Datatable>
        </div>

        <TablePagination
            :first-page="firstPage"
            :last-page="lastPage"
            :next-page="nextPage"
            :number-page="numberPage"
            :paginator-info="paginatorInfo"
            :prev-page="prevPage"
        />
    </div>
</template>

<script setup lang="ts">
import type { Config } from 'datatables.net';
import type { PaginatorInfo } from '~/types';
import Datatable from '~/components/ui/Datatable.client.vue';

const props = defineProps<{
    headers: { key: string; label: string; class?: string }[];
    data: Record<string, any>[];
    actions?: {
        name: string;
        icon: string;
        handler: (item: any) => void;
        class?: string;
        showButton?: boolean;
    }[]; // Optional actions
    primaryKey: string;
    paginatorInfo?: PaginatorInfo;
    firstPage: Function;
    prevPage: Function;
    nextPage: Function;
    lastPage: Function;
    numberPage: Function;
}>();

// Format headers into columns for Datatable
const formattedColumns = props.headers.map((header) => ({
    class: header.class || '',
    data: header.key,
    title: header.label,
}));

if (props.actions && props.actions.length) {
    formattedColumns.push({
        class: 'no-export',
        data: null,
        orderable: false,
        render: function (_, __, rowData) {
            return `<div class="actions" data-cell="${JSON.stringify(
                rowData,
            )}"></div>`;
        },
        title: 'Actions',
    });
}

// Datatable configuration options
const options: Config = {
    autoWidth: true,
    buttons: [
        {
            columns: ':not(.no-export)',
            extend: 'colvis',
            text: 'Columns',
        },
        'copy',
        'excel',
        'pdf',
        'print',
        'csv',
    ],
    dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
    paging: false,
    responsive: true,
    select: true,
};
</script>
