<template>
    <div class="relative flex justify-center items-center w-full">
        <template v-if="isLoading || !data.length">
            <div
                class="absolute flex-col top-64 flex justify-center items-center text-xl text-gray-500 dark:text-gray-300 mt-4"
            >
                <template v-if="isLoading">
                    <BlocksWave class="size-20 text-primary" />
                    <p class="animate-pulse">Fetching data</p>
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
            />
        </template>

        <template v-else>
            <div class="relative">
                <div
                    class="absolute top-64 flex flex-col items-center justify-center w-full"
                >
                    <Icon
                        name="mdi:account-alert"
                        class="text-red-800 animate-pulse"
                        size="70"
                    />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import BlocksWave from '~/components/spinner/BlocksWave.vue';

defineProps({
    isLoading: Boolean,
    data: Array,
    headers: Array,
    actions: Object,
    paginatorInfo: Object | null,
    paginationControls: {
        firstPage: Function,
        prevPage: Function,
        nextPage: Function,
        lastPage: Function,
        numberPage: Function,
    },
});

const auth = useAuth();
</script>
