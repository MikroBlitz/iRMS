<template>
    <div
        class="flex m-auto items-center justify-between bg-primary/80 p-1 rounded"
    >
        <ClientOnly>
            <div
                class="flex items-center gap-1 text-background dark:text-foreground"
            >
                <Icon name="solar:shop-linear" size="30" />
                <p class="text-2xl py-1">Items</p>
            </div>
            <div class="flex items-center gap-1">
                <div class="flex items-center relative">
                    <span>
                        <Icon
                            name="mdi-search"
                            class="absolute left-2 top-2 text-foreground"
                            size="25"
                        />
                    </span>
                    <input
                        v-model="search"
                        type="text"
                        placeholder="Search"
                        class="pl-9 py-2 rounded outline-none bg-card"
                        :class="isMobile ? 'w-[230px]' : 'w-auto'"
                    />
                </div>
                <span
                    class="flex items-center text-foreground p-1 justify-center cursor-pointer"
                    @click="toggleView()"
                >
                    <Icon
                        :name="name"
                        size="30"
                        class="text-background dark:text-foreground"
                    />
                </span>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
defineProps({
    name: {
        default: '',
        required: false,
        type: String,
    },
    toggleView: {
        default: () => {},
        required: false,
        type: Function,
    },
});

const search = inject('search');
const isMobile = inject('isMobile');
</script>
