<template>
    <main
        class="px-4 pt-3 pb-2 mt-2 bg-secondary dark:bg-primary rounded-t-2xl"
    >
        <div class="flex justify-between items-center rounded-md px-1">
            <div class="flex space-x-2 items-center justify-center">
                <Icon :name="icon" :size="size" />
                <p class="text-foreground text-xl font-bold">
                    {{ title }}
                </p>
                <slot name="actions" />
            </div>
            <Button
                v-if="router.currentRoute.value.name !== 'dashboard'"
                icon
                variant="destructive"
                size="sm"
                class="rounded-full px-2"
                @click="router.back()"
            >
                <Icon name="mdi:close" size="20" />
            </Button>
        </div>
    </main>
</template>

<script setup>
import { Button } from '~/components/ui/button';

defineProps({
    icon: {
        default: 'mdi:question-mark-box',
        required: false,
        type: String,
    },
    searchBar: {
        default: true,
        required: false,
        type: Boolean,
    },
    size: {
        default: '30',
        required: false,
        type: String,
    },
    title: {
        required: true,
        type: String,
    },
});

const router = useRouter();
</script>
