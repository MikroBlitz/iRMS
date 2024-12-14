<template>
    <textarea
        :id="field.name"
        v-model="form[field.name]"
        :disabled="submitButtonText === ''"
        :required="field.required"
        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-secondary text-foreground"
        :class="submitButtonText === '' ? 'bg-transparent shadow-none' : ''"
    />
</template>

<script setup lang="ts">
defineProps({
    field: {
        required: true,
        type: Object,
    },
    form: {
        required: true,
        type: Object,
    },
    submitButtonText: {
        required: true,
        type: String,
    },
});
</script>
