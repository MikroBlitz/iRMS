<template>
    <div
        class="flex m-auto items-center justify-between bg-primary px-3 py-3 md:rounded-t"
    >
        <ClientOnly>
            <div class="flex items-center gap-2 justify-center">
                <Button
                    variant="destructive"
                    class="rounded-full p-2 flex items-center justify-center"
                    @click="router.push(`/${backRoute}`)"
                >
                    <Icon
                        name="mdi:exit-to-app"
                        size="25"
                        style="rotate: 180deg"
                        class="text-gray-100"
                    />
                </Button>
                <p class="text-gray-100 text-2xl font-bold">
                    <span class="block">
                        {{ !isMobile ? title : titleMobile }}
                    </span>
                </p>
            </div>
            <div class="flex items-center gap-2 justify-between">
                <DisplayMode />
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'

defineProps<{
    title: string
    titleMobile?: string
    backRoute?: string
}>()

const isMobile = inject('isMobile')
const router = useRouter()
</script>
