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
    getInputType: {
        required: true,
        type: Function,
    },
    submitButtonText: {
        required: true,
        type: String,
    },
});
</script>

<template>
    <input
        :id="field.name"
        v-model="form[field.name]"
        :disabled="submitButtonText === ''"
        :type="getInputType(field)"
        :required="field.required"
        :min="field.min"
        :max="field.max"
        :step="field.step"
        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-secondary text-foreground"
        :class="submitButtonText === '' ? 'bg-transparent shadow-none' : ''"
    />
</template>
