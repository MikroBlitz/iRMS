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
import type { PaginatorInfo } from '~/types'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table'

defineProps<{
    headers: { key: string; label: string; class?: string }[]
    data: Record<string, any>[]
    actions?: {
        name: string
        icon: string
        handler: (item: any) => void
        class?: string
        showButton?: boolean
    }[]
    primaryKey: string
    paginatorInfo?: PaginatorInfo
    firstPage: Function
    prevPage: Function
    nextPage: Function
    lastPage: Function
    numberPage: Function
}>()
</script>
