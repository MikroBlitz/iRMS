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
                        :type="getInputType(field)"
                        :required="field.required"
                        :min="field.min"
                        :max="field.max"
                        :step="field.step"
                        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-secondary text-foreground"
                        @keyup.enter="handleSubmit"
                    />

                    <textarea
                        v-if="field.type === 'textarea'"
                        :id="field.name"
                        v-model="form[field.name]"
                        :required="field.required"
                        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-secondary text-foreground"
                        @keyup.enter="handleSubmit"
                    />

                    <!-- File Field -->
                    <input
                        v-if="field.type === 'file'"
                        :id="field.name"
                        type="file"
                        :required="field.required"
                        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-secondary text-foreground"
                        v-on="form[field.name]"
                        @keyup.enter="handleSubmit"
                    />

                    <!-- Checkbox Field -->
                    <input
                        v-if="field.type === 'checkbox'"
                        :id="field.name"
                        v-model="form[field.name]"
                        type="checkbox"
                        :required="field.required"
                        class="mt-1 mr-2 rounded border-none outline-none shadow-sm sm:text-sm"
                    />

                    <!-- Combobox Field -->
                    <template v-if="field.type === 'combobox'">
                        <ComboboxRoot
                            :id="field.name"
                            v-model="form[field.name]"
                            class="relative"
                        >
                            <ComboboxAnchor
                                class="mt-1 w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-secondary text-foreground flex justify-between items-center"
                            >
                                <ComboboxInput
                                    class="!bg-transparent outline-none w-full text-grass11 h-full selection:bg-grass5 placeholder-mauve8"
                                    :placeholder="`Select ${field.model}`"
                                />
                                <ComboboxTrigger>
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
                                    />

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
                        :required="field.required"
                        class="mt-1 block w-full rounded border-none outline-none px-3 p-2 shadow-sm sm:text-sm bg-gray-200 bg-secondary text-foreground"
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
                        @click="togglePasswordVisibility(field.name)"
                    >
                        <Icon
                            :class="
                                showPassword[field.name]
                                    ? 'text-red-500'
                                    : 'text-gray-500'
                            "
                            :name="
                                showPassword[field.name]
                                    ? 'mdi:eye-off'
                                    : 'mdi:eye'
                            "
                            size="20"
                        />
                    </button>
                </div>

                <div class="flex justify-end space-x-2 px-4">
                    <Button variant="ghost" @click="closeModal">
                        Cancel
                    </Button>
                    <Button type="submit" class="bg-emerald-700">
                        {{ submitButtonText }}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { useMagicKeys } from '@vueuse/core';
import {
    ComboboxAnchor,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxLabel,
    ComboboxRoot,
    ComboboxSeparator,
    ComboboxTrigger,
    ComboboxViewport,
} from 'radix-vue';
import { Button } from '~/components/ui/button';
import type { CrudModalField, Field } from '~/types';
import { roles } from '~/utils/authHelpers';

const props = defineProps({
    visible: Boolean,
    title: {
        type: String,
        default: 'Form',
    },
    fields: {
        type: Array as PropType<CrudModalField[]>,
        default: () => [],
    },
    initialValues: {
        type: Object as PropType<Record<string, any> | null>,
        default: () => ({}),
    },
    submitButtonText: {
        type: String,
        default: 'Submit',
    },
    form: Object,
    model: String,
});

const keys = useMagicKeys();
const continueSubmit = keys['Enter'];
const cancelSubmit = keys['Escape'];
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
    emit('submit', form.value);
};

const closeModal = () => {
    emit('close');
};

const togglePasswordVisibility = (fieldName: string) => {
    showPassword.value[fieldName] = !showPassword.value[fieldName];
};

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
                    const result = await useAsyncQuery(query);
                    const resultKey = Object.keys(result.data.value)[0];
                    data.value[field.model.toLowerCase()] =
                        result.data.value[resultKey] || [];
                }
            }
        }
    }
});

watch(continueSubmit, (e) => (e ? handleSubmit() : null));
watch(cancelSubmit, (e) => (e ? closeModal() : null));
</script>
