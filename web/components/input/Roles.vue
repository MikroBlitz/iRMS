<template>
    <select
        :id="field.name"
        v-model="form[field.name]"
        :disabled="submitButtonText === ''"
        :required="field.required"
        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-gray-200 bg-secondary text-foreground"
        :class="submitButtonText === '' ? 'bg-transparent shadow-none' : ''"
    >
        <option disabled value="">Select {{ field.model }}</option>
        <option
            v-for="option in roles || []"
            :key="option.id"
            :value="option.id"
        >
            {{ option.name }}
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

const roles = [
    { id: 0, name: 'User' },
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Staff' },
    { id: 3, name: 'Store Manager' },
];
</script>
