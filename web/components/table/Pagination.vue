<template>
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
                        @click.prevent="firstPage()"
                    />
                    <PaginationPrev
                        class="rounded-full"
                        @click.prevent="prevPage()"
                    />

                    <Popover>
                        <PopoverTrigger as-child>
                            <Button
                                class="relative size-10 p-0 rounded-full"
                                variant="secondary"
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
                        @click.prevent="nextPage()"
                    />
                    <PaginationLast
                        class="rounded-full"
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
} from '~/components/ui/pagination'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '~/components/ui/popover'
import { Button } from '~/components/ui/button'

defineProps({
    firstPage: {
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
})

// TODO: Pass perPageOptions query from server
const perPage = ref(10)
const perPageOptions = [10, 25, 100]
</script>
