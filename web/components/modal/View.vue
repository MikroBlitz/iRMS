<template>
    <div
        v-if="visible"
        class="fixed inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center"
    >
        <div
            v-on-click-outside="closeModal"
            class="bg-card rounded-lg shadow-lg w-full max-w-lg p-6 relative"
        >
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-foreground">
                    {{ title }}
                </h3>
                <Button
                    variant="destructive"
                    class="rounded-full px-2"
                    size="sm"
                    @click="closeModal"
                >
                    <Icon name="mdi:close" size="20" />
                </Button>
            </div>

            <div>
                {{ data }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';

import { Button } from '~/components/ui/button';

defineProps({
    visible: Boolean,
    title: {
        type: String,
        default: 'View',
    },
    data: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(['close']);

const closeModal = () => emit('close');
</script>
