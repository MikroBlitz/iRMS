<template>
    <div
        class="w-full rounded-b-lg h-[690px] p-2 bg-card border border-secondary dark:border-primary"
    >
        <div class="w-full rounded-b-lg h-full overflow-y-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            v-for="header in headers"
                            :key="header.key"
                            :class="header.class"
                        >
                            <span class="font-bold">
                                {{ header.label }}
                            </span>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow v-for="item in data" :key="item[primaryKey]">
                        <TableCell
                            v-for="header in headers"
                            :key="header.label"
                        >
                            {{
                                typeof header.key === 'function'
                                    ? header.key(item)
                                    : getNestedValue(item, header.key)
                            }}
                        </TableCell>
                        <TableCell
                            v-if="actions"
                            class="flex m-auto justify-end items-center"
                        >
                            <Button
                                v-for="(action, index) in actions"
                                v-show="action.showButton"
                                :key="index"
                                :disabled="!action.showButton"
                                variant="ghost"
                                class="mx-0.5 rounded-full"
                                :class="action.class"
                                size="icon"
                                @click="action.handler(item)"
                            >
                                <Icon :name="action.icon" size="22" />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div class="flex justify-between items-center p-2 mt-2">
            <div class="flex items-center justify-center gap-2">
                <div>
                    <select
                        v-model="perPage"
                        class="w-full px-3 py-1.5 rounded bg-secondary outline-none"
                    >
                        <option
                            v-for="option in perPageOptions"
                            :key="option"
                            :value="option"
                            class="text-sm"
                        >
                            {{ option }}
                        </option>
                    </select>
                </div>
                <Label class="text-sm font-bold">Per Page</Label>
            </div>

            <div class="flex justify-between items-center gap-4">
                <div class="text-sm text-muted-foreground">
                    Showing {{ paginatorInfo?.perPage }} of
                    {{ paginatorInfo?.total }} items
                </div>

                <Pagination
                    v-slot="{ page }"
                    :total="paginatorInfo?.total || 0"
                    :page="paginatorInfo?.currentPage || 1"
                    :per-page="paginatorInfo?.perPage || 10"
                    :sibling-count="1"
                    show-edges
                    :default-page="1"
                    @page-change="onPageChange"
                >
                    <PaginationList
                        v-slot="{ items }"
                        class="flex items-center gap-1"
                    >
                        <PaginationFirst />
                        <PaginationPrev />

                        <template v-for="(item, index) in items">
                            <PaginationListItem
                                v-if="item.type === 'page'"
                                :key="index"
                                :value="item.value"
                                as-child
                            >
                                <Button
                                    class="w-10 h-10 p-0"
                                    :variant="
                                        item.value ===
                                        paginatorInfo?.currentPage
                                            ? 'default'
                                            : 'outline'
                                    "
                                >
                                    {{ item.value }}
                                </Button>
                            </PaginationListItem>
                            <PaginationEllipsis
                                v-else
                                :key="item.type"
                                :index="index"
                            />
                        </template>

                        <PaginationNext />
                        <PaginationLast />
                    </PaginationList>
                </Pagination>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '~/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table';
import { Button } from '~/components/ui/button';
import type { PaginatorInfo } from '~/types';

defineProps<{
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
}>();

const perPage = ref(10);
const perPageOptions = [10, 25, 50, 100, 500];

const perPageSet = (value: number) => {
    perPage.value = value;
};

provide('perPageSet', perPageSet);

const emit = defineEmits<{
    (e: 'page-change', page: number): void;
}>();

const onPageChange = (page: number) => {
    emit('page-change', page);
};
</script>
