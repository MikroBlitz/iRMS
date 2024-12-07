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
                <template #actions="{ data }: { data: any }">
                    <div class="flex justify-end items-center">
                        <Button
                            v-for="(action, index) in actions"
                            v-show="action.showButton ?? true"
                            :key="index"
                            :disabled="action.showButton === false"
                            variant="ghost"
                            class="mx-0.5 rounded-full"
                            :class="action.class"
                            size="icon"
                            @click="action.handler(data)"
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
import type { Config, ColumnDef } from 'datatables.net';
import { ref } from 'vue';
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
    }[];
    primaryKey: string;
    paginatorInfo?: PaginatorInfo;
    firstPage: Function;
    prevPage: Function;
    nextPage: Function;
    lastPage: Function;
    numberPage: Function;
    handlePerPageChange?: Function;
}>();

const actions = ref(props.actions || []);

const formattedColumns = computed(() => {
    const columns: ColumnDef[] = props.headers.map((header) => ({
        class: header.class || '',
        data: typeof header.key === 'function' ? null : header.key,
        render:
            typeof header.key === 'function'
                ? (data, type, row) => header.key(row)
                : undefined,
        title: header.label,
    }));

    // Add actions column if actions exist
    if (actions.value.length) {
        columns.push({
            className: 'no-export actions-column',
            data: null,
            orderable: false,
            render: (data, type, row) => {
                return '<div class="actions-placeholder"></div>';
            },
            title: 'Actions',
        });
    }

    return columns;
});

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
        'csv',
        'print',
    ],
    dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
    paging: false,
    responsive: true,
    select: true,
};

console.log(actions.value);
</script>
