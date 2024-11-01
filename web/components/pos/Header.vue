<template>
    <div
        class="flex m-auto items-center justify-between bg-primary px-3 py-4 md:rounded-t"
    >
        <ClientOnly>
            <div class="flex items-center gap-2 justify-center">
                <Button
                    variant="destructive"
                    class="rounded-full p-2 flex items-center justify-center"
                    @click="router.push('/dashboard')"
                >
                    <Icon
                        name="mdi:exit-to-app"
                        size="25"
                        style="rotate: 180deg"
                        class="text-gray-100"
                    />
                </Button>
                <p class="text-gray-100 text-2xl font-bold">
                    <span class="block sm:hidden">POS</span>
                    <span class="hidden sm:block">Point of Sale</span>
                </p>
            </div>
            <div class="flex items-center gap-2 justify-between">
                <DisplayMode />
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';

const router = useRouter();
</script>
