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

                    <!-- Input Field -->
                    <input
                        v-if="
                            field.type === 'text' ||
                            field.type === 'email' ||
                            field.type === 'number' ||
                            field.type === 'password' ||
                            field.type === 'float'
                        "
                        :id="field.name"
                        v-model="form[field.name]"
                        :disabled="submitButtonText === ''"
                        :type="getInputType(field)"
                        :required="field.required"
                        :min="field.min"
                        :max="field.max"
                        :step="field.step"
                        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-secondary text-foreground"
                        :class="
                            submitButtonText === ''
                                ? 'bg-transparent shadow-none'
                                : ''
                        "
                    />

                    <textarea
                        v-if="field.type === 'textarea'"
                        :id="field.name"
                        v-model="form[field.name]"
                        :disabled="submitButtonText === ''"
                        :required="field.required"
                        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-secondary text-foreground"
                        :class="
                            submitButtonText === ''
                                ? 'bg-transparent shadow-none'
                                : ''
                        "
                    />

                    <!-- File Field -->
                    <input
                        v-if="field.type === 'file'"
                        :id="field.name"
                        type="file"
                        :disabled="submitButtonText === ''"
                        :required="field.required"
                        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-secondary text-foreground"
                        :class="
                            submitButtonText === ''
                                ? 'bg-transparent shadow-none'
                                : ''
                        "
                        v-on="form[field.name]"
                    />

                    <!-- Checkbox Field -->
                    <input
                        v-if="field.type === 'checkbox'"
                        :id="field.name"
                        v-model="form[field.name]"
                        :disabled="submitButtonText === ''"
                        type="checkbox"
                        :required="field.required"
                        class="mt-1 mr-2 rounded border-none outline-none shadow-sm sm:text-sm"
                        :class="
                            submitButtonText === ''
                                ? 'bg-transparent shadow-none'
                                : ''
                        "
                    />

                    <!-- Combobox Field -->
                    <template v-if="field.type === 'combobox'">
                        <ComboboxRoot
                            :id="field.name"
                            v-model="form[field.name]"
                            :display-value="
                                (value) =>
                                    getData(field.model as string).find(
                                        (item: any) => item.id === value,
                                    )?.[field.optionTitle as string] || ''
                            "
                            class="relative"
                        >
                            <ComboboxAnchor
                                class="mt-1 w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-secondary text-foreground flex justify-between items-center"
                                :class="
                                    submitButtonText === ''
                                        ? 'bg-transparent shadow-none'
                                        : ''
                                "
                            >
                                <ComboboxInput
                                    :value="
                                        getOptionText(form[field.name], field)
                                    "
                                    :disabled="submitButtonText === ''"
                                    class="!bg-transparent outline-none w-full text-grass11 h-full selection:bg-grass5 placeholder-mauve8"
                                    :class="
                                        submitButtonText === ''
                                            ? 'bg-transparent shadow-none'
                                            : ''
                                    "
                                    :placeholder="`Select ${field.model}`"
                                    :required="field.required"
                                />
                                <ComboboxTrigger
                                    :disabled="submitButtonText === ''"
                                >
                                    <Icon
                                        name="mdi:chevron-down"
                                        class="size-4"
                                    />
                                </ComboboxTrigger>
                            </ComboboxAnchor>

                            <ComboboxContent
                                class="absolute z-10 w-full mt-0.5 bg-secondary overflow-y-scroll max-h-[400px] rounded"
                            >
                                <ComboboxViewport class="p-[5px]">
                                    <ComboboxEmpty
                                        class="text-mauve8 text-xs font-medium text-center py-2"
                                    >
                                        No options available
                                    </ComboboxEmpty>

                                    <ComboboxGroup>
                                        <ComboboxItem
                                            v-for="option in getData(
                                                field.model as string,
                                            )"
                                            :key="option.id"
                                            :value="option.id"
                                            class="flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none rounded hover:bg-accent"
                                        >
                                            <ComboboxItemIndicator
                                                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                                            >
                                                <Icon name="mdi:check" />
                                            </ComboboxItemIndicator>
                                            <span>
                                                {{
                                                    option[
                                                        field.optionTitle as string
                                                    ]
                                                }}
                                            </span>
                                        </ComboboxItem>
                                        <ComboboxSeparator
                                            class="h-[1px] bg-grass6 m-[5px]"
                                        />
                                    </ComboboxGroup>
                                </ComboboxViewport>
                            </ComboboxContent>
                        </ComboboxRoot>
                    </template>

                    <!-- Select Field -->
                    <select
                        v-if="field.type === 'select'"
                        :id="field.name"
                        v-model="form[field.name]"
                        :required="field.required"
                        class="mt-1 block w-full rounded border-none outline-none p-2 shadow-sm sm:text-sm bg-secondary text-foreground"
                        :class="
                            submitButtonText === ''
                                ? 'bg-transparent shadow-none'
                                : ''
                        "
                    >
                        <option selected value="">
                            Select {{ field.model }}
                        </option>
                        <option
                            v-for="option in getData(field.model as string)"
                            :key="option.id"
                            :value="option.id"
                        >
                            {{ option[field.optionTitle as string] }}
                        </option>
                    </select>

                    <!-- User Role Select - TODO: fix dynamic select -->
                    <select
                        v-if="field.type === 'roleSelect'"
                        :id="field.name"
                        v-model="form[field.name]"
                        :disabled="submitButtonText === ''"
                        :required="field.required"
                        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-gray-200 bg-secondary text-foreground"
                        :class="
                            submitButtonText === ''
                                ? 'bg-transparent shadow-none'
                                : ''
                        "
                    >
                        <option disabled value="">
                            Select {{ field.model }}
                        </option>
                        <option
                            v-for="option in roles || []"
                            :key="option.id"
                            :value="option.id"
                        >
                            {{ option.name }}
                        </option>
                    </select>

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
import {
    ComboboxAnchor,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxRoot,
    ComboboxSeparator,
    ComboboxTrigger,
    ComboboxViewport,
} from 'radix-vue';

import type { CrudModalField, Field } from '~/types';

import { Button } from '~/components/ui/button';
import { roles } from '~/utils/authHelpers';

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

watch(
    () => props.initialValues,
    (newValues) => {
        form.value = { ...newValues };
    },
    { immediate: true },
);

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

const data: Ref<Record<string, any>> = ref({});
const getData = (model: string) => data.value[model.toLowerCase()] || [];

const getOptionText = (value, field) => {
    const option = getData(field.model).find((item) => item.id === value);
    return option ? option[field.optionTitle] : '';
};

onMounted(async () => {
    if (Array.isArray(props.fields)) {
        for (const field of props.fields) {
            if (
                (field.type === 'select' || field.type === 'combobox') &&
                field.model &&
                field.queryName
            ) {
                const queryModule = await import(`~/graphql/${field.model}.ts`);
                const query = queryModule[field.queryName];
                if (query) {
                    const result: any = await useAsyncQuery(query);
                    const resultKey: any = Object.keys(result.data.value)[0];
                    data.value[field.model.toLowerCase()] =
                        result.data.value[resultKey] || [];
                }
            }
        }
    }
});

watch(continueSubmit, (e) => (e ? handleSubmit() : null));
watch(cancelSubmit, (e) => (e ? closeModal() : null));

useBodyClass('overflow-hidden');
</script>
