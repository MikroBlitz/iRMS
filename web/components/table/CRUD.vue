<template>
    <div class="flex justify-center py-0.5 gap-1">
        <Button
            v-for="(btn, index) in crudButtons"
            :key="index"
            :disabled="disabledButtons.includes(btn.id)"
            :class="disabledButtons.includes(btn.id) ? 'hidden' : ''"
            variant="outline"
            size="icon"
            class="rounded-full"
            @click="handleClick(index, btn.action)"
        >
            <Icon
                :name="btn.iconName"
                :size="btn.iconSize"
                :class="[
                    btn.iconClass,
                    {
                        'rotate-animation':
                            clickedIndex === index &&
                            btn.iconName === 'solar:refresh-line-duotone',
                    },
                ]"
            />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core';
import { Button } from '~/components/ui/button';
import type { CrudButton } from '~/types';

const props = defineProps({
    disabledButtons: {
        default: () => [],
        type: Array as PropType<string[]>,
    },
    onCreate: {
        default: () => {},
        type: Function,
    },
    onRefresh: {
        default: () => {},
        type: Function,
    },
});

const clickedIndex = ref<number | null>(null);

const handleClick = (index: number, action: Function | undefined) => {
    if (
        crudButtons[index] &&
        crudButtons[index].iconName === 'solar:refresh-line-duotone'
    ) {
        clickedIndex.value = index;
    }

    if (action) action();

    useTimeoutFn(() => {
        clickedIndex.value = null;
    }, 1000);
};

const crudButtons: CrudButton[] = [
    {
        action: props.onCreate,
        iconClass: 'text-emerald-500',
        iconName: 'mdi:add',
        iconSize: 20,
        id: 'create',
    },
    {
        action: props.onRefresh,
        iconClass: 'text-foreground',
        iconName: 'solar:refresh-line-duotone',
        iconSize: 20,
        id: 'refresh',
    },
];
</script>

<style scoped>
.rotate-animation {
    animation: rotate-icon 1s ease-in-out;
}

@keyframes rotate-icon {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
