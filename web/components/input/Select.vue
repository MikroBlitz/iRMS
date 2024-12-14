<template>
    <select
        :id="field.name"
        v-model="form[field.name]"
        :required="field.required"
        class="mt-1 block w-full rounded border-none outline-none p-2 shadow-sm sm:text-sm bg-secondary text-foreground"
        :class="submitButtonText === '' ? 'bg-transparent shadow-none' : ''"
    >
        <option selected value="">Select {{ field.model }}</option>
        <option
            v-for="option in getData(field.model as string)"
            :key="option.id"
            :value="option.id"
        >
            {{ option[field.optionTitle as string] }}
        </option>
    </select>
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
    getData: {
        required: true,
        type: Function,
    },
    submitButtonText: {
        required: true,
        type: String,
    },
});
</script>
