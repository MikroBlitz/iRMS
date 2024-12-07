<template>
    <div class="relative flex justify-center items-center w-full">
        <template v-if="isLoading || !data.length">
            <div
                class="absolute flex-col top-64 flex justify-center items-center text-xl text-gray-500 dark:text-gray-300 mt-4"
            >
                <template v-if="isLoading">
                    <SpinnerTadpole
                        class="size-16 mb-2 text-primary dark:text-accent"
                    />
                    <p class="animate-pulse">Loading...</p>
                </template>

                <div v-else class="flex flex-col items-center">
                    <Icon
                        name="mdi:warning"
                        class="text-destructive"
                        size="65"
                    />
                    <span>No data</span>
                </div>
            </div>
        </template>

        <template v-else-if="auth.user.role">
            <TableData
                :headers="headers"
                :data="data"
                :actions="actions"
                primary-key="id"
                class="w-full"
                :paginator-info="paginatorInfo"
                :first-page="paginationControls.firstPage"
                :prev-page="paginationControls.prevPage"
                :next-page="paginationControls.nextPage"
                :last-page="paginationControls.lastPage"
                :number-page="paginationControls.numberPage"
                @update:per-page="paginationControls.handlePerPageChange"
            />
        </template>

        <template v-else>
            <div class="relative">
                <div
                    class="absolute top-64 flex flex-col items-center justify-center w-full"
                >
                    <Icon
                        name="mdi:account-alert"
                        class="text-destructive animate-pulse"
                        size="70"
                    />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
defineProps({
    actions: Object,
    data: Array,
    headers: Array,
    isLoading: Boolean,
    paginationControls: {
        firstPage: Function,
        lastPage: Function,
        nextPage: Function,
        numberPage: Function,
        prevPage: Function,
    },
    paginatorInfo: Object | null,
});

const auth = useAuth();
</script>
