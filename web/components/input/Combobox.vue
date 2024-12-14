<template>
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
            :class="submitButtonText === '' ? 'bg-transparent shadow-none' : ''"
        >
            <ComboboxInput
                :value="getOptionText(form[field.name], field)"
                :disabled="submitButtonText === ''"
                class="!bg-transparent outline-none w-full text-grass11 h-full selection:bg-grass5 placeholder-mauve8"
                :class="
                    submitButtonText === '' ? 'bg-transparent shadow-none' : ''
                "
                :placeholder="`Select ${field.model}`"
                :required="field.required"
            />
            <ComboboxTrigger :disabled="submitButtonText === ''">
                <Icon name="mdi:chevron-down" class="size-4" />
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
                        v-for="option in getData(field.model as string)"
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
                            {{ option[field.optionTitle as string] }}
                        </span>
                    </ComboboxItem>
                    <ComboboxSeparator class="h-[1px] bg-grass6 m-[5px]" />
                </ComboboxGroup>
            </ComboboxViewport>
        </ComboboxContent>
    </ComboboxRoot>
</template>

<script setup lang="ts">
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

defineProps({
    data: {
        required: true,
        type: Object,
    },
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
    getOptionText: {
        required: true,
        type: Function,
    },
    submitButtonText: {
        required: true,
        type: String,
    },
});
</script>
