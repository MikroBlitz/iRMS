<template>
    <div
        v-if="visible"
        class="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
    >
        <div
            v-on-click-outside="closeModal"
            class="bg-card rounded shadow-lg w-full max-w-lg p-6 relative"
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

            <form @submit.prevent="handleSubmit">
                <div
                    v-for="(field, index) in fields"
                    :key="index"
                    class="relative mb-4 px-4"
                >
                    <label
                        :for="field.name"
                        class="block text-sm font-medium text-foreground"
                    >
                        {{ field.label }}
                    </label>

                    <template
                        v-if="
                            field.type === 'text' ||
                            field.type === 'email' ||
                            field.type === 'number' ||
                            field.type === 'password' ||
                            field.type === 'float'
                        "
                    >
                        <InputBasic
                            :field="field"
                            :form="form"
                            :submit-button-text="submitButtonText"
                            :get-input-type="getInputType"
                        />
                    </template>

                    <template v-if="field.type === 'textarea'">
                        <InputTextarea
                            :field="field"
                            :form="form"
                            :submit-button-text="submitButtonText"
                        />
                    </template>

                    <template v-if="field.type === 'combobox'">
                        <InputCombobox
                            :data="getData(field.model as string)"
                            :field="field"
                            :form="form"
                            :get-option-text="getOptionText"
                            :submit-button-text="submitButtonText"
                            :get-data="getData"
                        />
                    </template>

                    <template v-if="field.type === 'select'">
                        <InputSelect
                            :field="field"
                            :form="form"
                            :get-data="getData"
                            :submit-button-text="submitButtonText"
                        />
                    </template>

                    <template v-if="field.type === 'roleSelect'">
                        <InputRoles
                            :field="field"
                            :form="form"
                            :get-data="getData"
                            :submit-button-text="submitButtonText"
                        />
                    </template>

                    <!-- Toggle button for password visibility -->
                    <button
                        v-if="field.type === 'password' && form[field.name]"
                        type="button"
                        class="absolute top-5 right-3 mt-3 mr-4 text-foreground"
                        :disabled="submitButtonText === ''"
                        @click="togglePasswordVisibility(field.name)"
                    >
                        <Icon
                            :class="
                                showPassword[field.name]
                                    ? 'text-destructive'
                                    : 'text-emerald-700'
                            "
                            :name="
                                showPassword[field.name]
                                    ? 'mdi:eye'
                                    : 'mdi:eye-off'
                            "
                            size="20"
                        />
                    </button>
                </div>

                <div
                    v-if="submitButtonText"
                    class="flex justify-end space-x-2 px-4"
                >
                    <Button
                        :disabled="isLoading"
                        :class="
                            isLoading
                                ? 'px-6 bg-secondary'
                                : 'bg-emerald-700 gap-2'
                        "
                        type="submit"
                    >
                        <SpinnerTadpole
                            v-if="isLoading"
                            class="size-7 text-card dark:text-card-foreground mx-1"
                        />
                        <span
                            v-else
                            class="font-bold"
                            :class="{ 'animate-pulse': isLoading }"
                        >
                            {{ submitButtonText }}
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import { vOnClickOutside } from '@vueuse/components';

import type { CrudModalField, Field } from '~/types';

import { Button } from '~/components/ui/button';

const props = defineProps({
    fields: {
        default: () => [],
        type: Array as PropType<CrudModalField[]>,
    },
    form: Object,
    initialValues: {
        default: () => ({}),
        type: Object as PropType<Record<string, any> | null>,
    },
    model: String,
    submitButtonText: {
        default: 'Submit',
        type: String,
    },
    title: {
        default: 'Form',
        type: String,
    },
    visible: Boolean,
});

const isLoading = ref(false);
const keys = useMagicKeys();
const continueSubmit: any = keys['Enter'];
const cancelSubmit: any = keys['Escape'];
const showPassword = ref<Record<string, boolean>>({});
const emit = defineEmits(['submit', 'close']);
const form = ref<Record<string, any>>({});
const data: Ref<Record<string, any>> = ref({});

const handleSubmit = () => {
    isLoading.value = true;
    emit('submit', form.value);
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
};
const closeModal = () => emit('close');

const togglePasswordVisibility = (fieldName: string) =>
    (showPassword.value[fieldName] = !showPassword.value[fieldName]);

const getInputType = (field: Field) => {
    if (field.type === 'password') {
        return showPassword.value[field.name] ? 'text' : 'password';
    }
    if (field.type === 'float') {
        return 'number';
    }
    return field.type;
};

const getData = (model: string) => data.value[model.toLowerCase()] || [];
const getOptionText = (
    value: string | number,
    field: { model: string; optionTitle: string },
) => {
    const option = getData(field.model).find(
        (item: { id: string | number }) => item.id === value,
    );
    return option ? option[field.optionTitle] : '';
};

onMounted(async () => {
    if (Array.isArray(props.fields)) {
        await processFields(props.fields, data);
    }
});

watch(
    () => props.initialValues,
    (newValues) => {
        form.value = { ...newValues };
    },
    { immediate: true },
);
watch(continueSubmit, (e) => (e ? handleSubmit() : null));
watch(cancelSubmit, (e) => (e ? closeModal() : null));
useBodyClass('overflow-hidden');
</script>
