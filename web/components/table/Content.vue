<template>
    <div class="relative flex justify-center items-center w-full">
        <template v-if="isLoading || !data.length">
            <template v-if="isLoading">
                <div
                    class="absolute top-0 left-0 right-0 h-0.5 bg-primary dark:bg-foreground overflow-hidden"
                >
                    <div class="h-full w-full animate-loading-bar" />
                </div>
                <div
                    class="absolute flex-col flex justify-center items-center text-xl mt-4"
                >
                    <SpinnerBlocksWave
                        class="size-8 mb-1 text-primary dark:text-foreground"
                    />
                    <p class="animate-pulse">Loading data...</p>
                </div>
                <div
                    class="h-[calc(100vh-9.5rem)] rounded-b-2xl rounded-t-none w-full bg-secondary dark:bg-primary"
                />
                <div
                    class="absolute bottom-3 px-4 flex items-center justify-between w-full"
                >
                    <Skeleton
                        class="h-10 w-20 bg-primary/50 dark:bg-secondary"
                    />
                    <div class="flex items-center space-x-1">
                        <Skeleton
                            class="h-5 w-20 mr-2 rounded-full bg-primary/50 dark:bg-secondary"
                        />
                        <Skeleton
                            class="size-10 rounded-full bg-primary/50 dark:bg-secondary"
                        />
                        <Skeleton
                            class="size-10 rounded-full bg-primary/50 dark:bg-secondary"
                        />
                        <Skeleton
                            class="size-10 rounded-full bg-primary/50 dark:bg-secondary"
                        />
                        <Skeleton
                            class="size-10 rounded-full bg-primary/50 dark:bg-secondary"
                        />
                        <Skeleton
                            class="size-10 rounded-full bg-primary/50 dark:bg-secondary"
                        />
                    </div>
                </div>
            </template>
            <div v-else class="flex flex-col w-full items-center">
                <div
                    class="h-[calc(100vh-9.5rem)] rounded-b-2xl rounded-t-none w-full bg-secondary dark:bg-primary flex items-center justify-center"
                >
                    <div class="flex flex-col items-center justify-center">
                        <Icon
                            name="mdi:warning"
                            class="text-destructive"
                            size="40"
                        />
                        <span>No data</span>
                    </div>
                </div>
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
            <div class="relative w-full flex justify-center items-center">
                <div
                    class="absolute flex-col top-56 flex justify-center items-center text-xl mt-4"
                >
                    <Icon
                        name="mdi:account-alert"
                        class="text-destructive animate-pulse"
                        size="50"
                    />
                    <p class="animate-pulse">Unauthorized Access</p>
                </div>
                <div
                    class="h-[calc(100vh-9.5rem)] rounded-b-2xl rounded-t-none w-full bg-secondary dark:bg-primary"
                />
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

<style scoped>
@keyframes loading-bar {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.animate-loading-bar {
    animation: loading-bar 1.5s infinite linear;
    background: linear-gradient(
        90deg,
        transparent 0%,
        hsl(var(--card)) 100%,
        transparent 100%
    );
}
</style>
