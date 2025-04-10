<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
    DialogClose,
    DialogContent,
    type DialogContentEmits,
    type DialogContentProps,
    DialogOverlay,
    DialogPortal,
    useForwardPropsEmits,
} from 'radix-vue'
import { X } from 'lucide-vue-next'
import { type SheetVariants, sheetVariants } from '.'
import { cn } from '@/lib/utils'

interface SheetContentProps extends DialogContentProps {
    side?: SheetVariants['side']
    class?: HTMLAttributes['class']
}

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<SheetContentProps>()

const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
    const { class: _, side, ...delegated } = props

    return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
    <DialogPortal>
        <DialogOverlay
            class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <DialogContent
            :class="cn(sheetVariants({ side }), props.class)"
            v-bind="{ ...forwarded, ...$attrs }"
        >
            <slot />

            <DialogClose
                class="absolute right-6 top-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-secondary"
            >
                <X class="size-5 text-destructive" />
            </DialogClose>
        </DialogContent>
    </DialogPortal>
</template>
