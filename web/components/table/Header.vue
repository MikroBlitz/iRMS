<template>
    <main class="px-4 py-4 pb-1 bg-primary/80 dark:bg-primary rounded-t">
        <div class="flex-col m-auto items-center rounded-md">
            <div
                class="flex items-center justify-between bg-card px-2 py-3 rounded-md w-full"
            >
                <div class="flex items-center justify-between gap-1">
                    <Icon :name="icon" :size="size" />
                    <p class="text-foreground text-xl font-bold">
                        {{ title }}
                    </p>
                </div>
                <div
                    v-if="searchBar && !isMobile"
                    class="flex items-center relative"
                >
                    <span>
                        <Icon
                            name="mdi-search"
                            class="absolute left-2 top-2 text-foreground"
                            size="25"
                        />
                    </span>
                    <Input
                        v-model="tableSearch"
                        type="text"
                        placeholder="Search"
                        class="pl-9 py-2 rounded outline-none bg-secondary dark:bg-primary"
                    />
                </div>
            </div>
            <div
                class="pt-0.5 flex justify-between items-center rounded-md px-2 mt-1"
            >
                <Button
                    v-if="router.currentRoute.value.name !== 'dashboard'"
                    icon
                    variant="destructive"
                    size="sm"
                    class="rounded-full px-2"
                    @click="router.back()"
                >
                    <Icon name="mdi:arrow-left-thick" size="20" />
                </Button>
                <slot name="actions" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { Button } from '~/components/ui/button'

defineProps({
    icon: {
        default: 'mdi:question-mark-box',
        required: false,
        type: String,
    },
    searchBar: {
        default: true,
        required: false,
        type: Boolean,
    },
    size: {
        default: '35',
        required: false,
        type: String,
    },
    title: {
        required: true,
        type: String,
    },
})

const tableSearch = ref('')
const router = useRouter()
const isMobile = inject('isMobile')
</script>
