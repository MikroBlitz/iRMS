<template>
    <div>
        <div class="w-full bg-card border border-secondary dark:border-primary">
            <Datatable
                v-auto-animate
                :options="options"
                :columns="formattedColumns"
                :data="data"
                :actions="actions"
                class="overflow-x-scroll w-full"
            >
                <template #actions="{ cellData }: { cellData: any }">
                    <div class="flex justify-start items-center space-x-1">
                        <div v-for="(action, index) in actions">
                            <Button
                                v-if="action.showButton"
                                :key="index"
                                class="h-9 border-secondary"
                                :class="action.class"
                                variant="ghost"
                                @click="action.handler(cellData)"
                            >
                                {{ toTitleCase(action.name) }}
                                <!--                                <Icon :name="action.icon" size="20" /> -->
                            </Button>
                        </div>
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
            :handle-per-page-change="handlePerPageChange"
        />
    </div>
</template>

<script setup lang="ts">
import type { Config, ColumnDef } from 'datatables.net';
import type { PaginatorInfo } from '~/types';
import Datatable from '~/components/ui/Datatable.client.vue';
import { Button } from '~/components/ui/button';

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

    if (props.actions && props.actions.length) {
        columns.push({
            className: 'no-export actions-column',
            data: null,
            orderable: false,
            render: '#actions',
            responsivePriority: 1,
            title: 'Actions',
        });
    }

    return columns;
});

const options: Config | any = {
    autoWidth: true,
    buttons: [
        {
            columns: ':not(.no-export)',
            extend: 'colvis',
            text: 'Cols',
        },
        {
            action: function (e: any, dt: any, _: any, __: any) {
                dt.rows().select();
            },
            text: 'Select all',
        },
    ],
    // Add Q to enable query builder -> "Q<'flex
    dom: "<'flex p-2 flex-col lg:flex-row w-full lg:items-center lg:justify-between gap-5'B li f><'border-t rounded-none't>",
    paging: false,
    responsive: true,
    select: true,
};
const auth = useAuth();
auth.user.role === 1 || auth.user.role === 3
    ? options.buttons?.push('csv', 'pdf') // print, copy, excel
    : null;
</script>
