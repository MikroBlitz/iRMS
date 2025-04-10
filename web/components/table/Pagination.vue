<template>
    <div
        class="flex px-4 py-2 bordet-t border-secondary rounded-b-2xl justify-between items-center bg-secondary dark:bg-primary"
    >
        <div class="flex items-center justify-center gap-2">
            <div>
                <select
                    v-model="localPerPage"
                    class="= py-1.5 bg-card rounded-md w-20 outline-none"
                    @update:model-value="handlePerPageChange"
                >
                    <option
                        v-for="option in perPageOptions"
                        :key="option"
                        :value="option"
                        class="text-sm"
                    >
                        {{ option === -1 ? 'All' : option }}
                    </option>
                </select>
            </div>
        </div>

        <div class="flex justify-between items-center gap-4">
            <div class="text-sm text-muted-foreground">
                {{ paginatorInfo?.currentPage }} of
                {{ paginatorInfo?.lastPage }}
                {{ paginatorInfo?.lastPage > 1 ? 'pages' : 'page' }}
            </div>

            <Pagination
                v-slot="{ page }"
                :total="paginatorInfo?.total || 0"
                :page="paginatorInfo?.currentPage || 1"
                :per-page="paginatorInfo?.perPage || 10"
                :sibling-count="1"
                show-edges
                :default-page="1"
                @page-change=""
            >
                <PaginationList
                    v-slot="{ items }"
                    class="flex items-center gap-1"
                >
                    <PaginationFirst
                        class="rounded-full"
                        :disabled="
                            paginatorInfo?.lastPage <= 1 ||
                            paginatorInfo?.currentPage === 1
                        "
                        @click.prevent="firstPage()"
                    />
                    <PaginationPrev
                        class="rounded-full"
                        :disabled="
                            paginatorInfo?.lastPage <= 1 ||
                            paginatorInfo?.currentPage === 1
                        "
                        @click.prevent="prevPage()"
                    />

                    <Popover>
                        <PopoverTrigger as-child>
                            <Button
                                class="relative size-10 p-0 rounded-full"
                                variant="outline"
                                :disabled="paginatorInfo?.lastPage <= 1"
                            >
                                {{ paginatorInfo?.currentPage }}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            v-if="paginatorInfo?.lastPage > 1"
                            class="w-auto bg-card rounded-full p-1 space-x-1"
                        >
                            <template v-for="(item, index) in items">
                                <PaginationListItem
                                    v-if="item.type === 'page'"
                                    :key="index"
                                    :value="item.value"
                                    as-child
                                >
                                    <Button
                                        class="size-10 p-0 rounded-full"
                                        :variant="
                                            item.value ===
                                            paginatorInfo?.currentPage
                                                ? 'secondary'
                                                : 'outline'
                                        "
                                        @click.prevent="numberPage(item.value)"
                                    >
                                        {{ item.value }}
                                    </Button>
                                </PaginationListItem>
                                <!--                                    <PaginationEllipsis -->
                                <!--                                        v-else -->
                                <!--                                        :key="item.type" -->
                                <!--                                        :index="index" -->
                                <!--                                    /> -->
                            </template>
                        </PopoverContent>
                    </Popover>

                    <PaginationNext
                        class="rounded-full"
                        :disabled="
                            paginatorInfo?.lastPage <= 1 ||
                            paginatorInfo?.currentPage ===
                                paginatorInfo?.lastPage
                        "
                        @click.prevent="nextPage()"
                    />
                    <PaginationLast
                        class="rounded-full"
                        :disabled="
                            paginatorInfo?.lastPage <= 1 ||
                            paginatorInfo?.currentPage ===
                                paginatorInfo?.lastPage
                        "
                        @click.prevent="lastPage()"
                    />
                </PaginationList>
            </Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Pagination,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '~/components/ui/pagination';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '~/components/ui/popover';
import { Button } from '~/components/ui/button';

const props = defineProps({
    firstPage: {
        default: () => () => {},
        type: Function,
    },
    handlePerPageChange: {
        default: () => () => {},
        type: Function,
    },
    lastPage: {
        default: () => () => {},
        type: Function,
    },
    nextPage: {
        default: () => () => {},
        type: Function,
    },
    numberPage: {
        default: () => () => {},
        type: Function,
    },
    paginatorInfo: {
        default: () => ({}),
        type: Object,
    },
    prevPage: {
        default: () => () => {},
        type: Function,
    },
});

const emit = defineEmits(['update:perPage']);

const perPageOptions = [10, 50, 100, 1000, -1];
const localPerPage = ref(props.paginatorInfo.perPage || 10);
</script>
