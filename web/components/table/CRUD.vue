<template>
    <div class="flex justify-center py-0.5 gap-1">
        <Button
            v-for="(btn, index) in crudButtons"
            :key="index"
            :disabled="disabledButtons.includes(btn.id)"
            :class="disabledButtons.includes(btn.id) ? 'hidden' : ''"
            variant="outline"
            size="icon"
            class="rounded-full hover:bg-gray-500"
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
import { Button } from '~/components/ui/button';
import type { CrudButton } from '~/types';

const props = defineProps({
    onCreate: {
        type: Function,
        default: () => {},
    },
    onRefresh: {
        type: Function,
        default: () => {},
    },
    disabledButtons: {
        type: Array as PropType<string[]>,
        default: () => [],
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

    setTimeout(() => {
        clickedIndex.value = null;
    }, 1000);
};

const crudButtons: CrudButton[] = [
    {
        id: 'create',
        iconName: 'mdi:add',
        iconSize: 20,
        iconClass: 'text-emerald-500',
        action: props.onCreate,
    },
    {
        id: 'refresh',
        iconName: 'solar:refresh-line-duotone',
        iconSize: 20,
        iconClass: 'text-foreground',
        action: props.onRefresh,
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
