<template>
    <div class="relative flex justify-center items-center w-full">
        <template v-if="isLoading || !data.length">
            <template v-if="isLoading">
                <div
                    class="absolute flex-col top-56 flex justify-center items-center text-xl mt-4"
                >
                    <SpinnerTadpole
                        class="size-16 mb-2 text-primary dark:text-foreground"
                    />
                    <p class="animate-pulse">Loading data...</p>
                </div>
                <Skeleton
                    class="h-[600px] rounded-b rounded-t-none w-full bg-secondary"
                />
                <div
                    class="absolute -bottom-12 px-2 flex items-center justify-between w-full"
                >
                    <Skeleton class="h-10 w-16 bg-secondary" />
                    <div class="flex items-center space-x-1">
                        <Skeleton
                            class="h-5 w-20 mr-2 rounded-full bg-secondary"
                        />
                        <Skeleton class="size-10 rounded-full bg-secondary" />
                        <Skeleton class="size-10 rounded-full bg-secondary" />
                        <Skeleton class="size-10 rounded-full bg-secondary" />
                        <Skeleton class="size-10 rounded-full bg-secondary" />
                        <Skeleton class="size-10 rounded-full bg-secondary" />
                    </div>
                </div>
            </template>
            <div v-else class="flex flex-col mt-60 items-center">
                <Icon name="mdi:warning" class="text-destructive" size="65" />
                <span>No data</span>
            </div>
        </template>

        <!--    Auth user    -->
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
                :handle-per-page-change="paginationControls.handlePerPageChange"
            />
        </template>

        <!--    No auth user    -->
        <template v-else>
            <div class="relative w-full">
                <div
                    class="absolute top-64 flex flex-col items-center justify-center w-full"
                >
                    <Icon
                        name="mdi:account-alert"
                        class="text-destructive animate-pulse"
                        size="70"
                    />
                    <span>Unauthorized Access</span>
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
        handlePerPageChange: Function,
        lastPage: Function,
        nextPage: Function,
        numberPage: Function,
        prevPage: Function,
    },
    paginatorInfo: Object | null,
});

const auth = useAuth();
</script>
