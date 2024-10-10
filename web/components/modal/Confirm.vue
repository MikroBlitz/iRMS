<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center"
    >
        <div
            v-on-click-outside="cancel"
            class="bg-card rounded-lg shadow-lg w-full max-w-lg p-6 relative"
        >
            <h2 class="text-lg font-semibold mb-4">
                {{ title }}
            </h2>
            <p class="mb-6 text-center">
                {{ message }}
            </p>
            <div class="flex justify-end space-x-4">
                <Button variant="secondary" @click="cancel"> Cancel </Button>
                <Button variant="destructive" @click="confirm"> Delete </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { useMagicKeys } from '@vueuse/core';
import { Button } from '~/components/ui/button';

const keys = useMagicKeys();
const continueDeletion = keys['Enter'];
const cancelDeletion = keys['Escape'];

const props = defineProps({
    title: { type: String, default: 'Confirm' },
    message: { type: String, default: 'Are you sure you want to proceed?' },
    isOpen: { type: Boolean, default: false },
});
const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => emit('confirm');
const cancel = () => emit('cancel');

watch(continueDeletion, (e) => (e ? confirm() : null));
watch(cancelDeletion, (e) => (e ? cancel() : null));
</script>
