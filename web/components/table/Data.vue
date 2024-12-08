<template>
    <div>
        <div
            class="w-full rounded-b p-2 bg-card border border-secondary dark:border-primary"
        >
            <Datatable
                :options="options"
                :columns="formattedColumns"
                :data="data"
                :actions="actions"
                class="overflow-auto w-full"
            >
                <template #actions="{ cellData }: { cellData: any }">
                    <div class="flex justify-start items-center space-x-1">
                        <div v-for="(action, index) in actions">
                            <!--                        <Popover> -->
                            <!--                            <PopoverTrigger as-child> -->
                            <!--                                <Button -->
                            <!--                                    class="relative size-8 p-0 rounded-full" -->
                            <!--                                    variant="outline" -->
                            <!--                                > -->
                            <!--                                    <span -->
                            <!--                                        class="absolute font-bold text-2xl bottom-1.5" -->
                            <!--                                        >...</span -->
                            <!--                                    > -->
                            <!--                                </Button> -->
                            <!--                            </PopoverTrigger> -->
                            <!--                            <PopoverContent -->
                            <!--                                class="w-auto bg-card -mt-10 p-1 space-x-1" -->
                            <!--                            > -->
                            <!--                                -->
                            <!--                            </PopoverContent> -->
                            <!--                        </Popover> -->
                            <Button
                                v-if="action.showButton"
                                :key="index"
                                class="h-9 w-14"
                                :class="action.class"
                                variant="outline"
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
</script>
