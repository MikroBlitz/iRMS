<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
})

type Props = {
    modelValue?: string | null
    errors?: string[] | string
}

const props = defineProps<Props>()
defineEmits(['update:modelValue'])

const renderedErrors = computed(() =>
    Array.isArray(props.errors)
        ? props.errors
        : props.errors
          ? [props.errors]
          : [],
)
</script>

<template>
    <div>
        <input
            :value="modelValue"
            class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-bind="$attrs"
            @input="
                $emit(
                    'update:modelValue',
                    ($event.target as HTMLInputElement).value,
                )
            "
        />

        <!-- Validation Errors -->
        <ul
            v-if="renderedErrors?.length > 0"
            class="mt-3 text-sm text-destructive"
        >
            <li v-for="error in renderedErrors" :key="error">
                {{ error }}
            </li>
        </ul>
    </div>
</template>
