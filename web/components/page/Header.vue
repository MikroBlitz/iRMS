<template>
    <div class="flex items-center space-x-2 px-2 py-3">
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

        <div class="flex items-center">
            <p class="text-foreground text-2xl md:text-3xl font-bold">
                {{ pageTitle }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';

defineProps({
    pageTitle: {
        required: true,
        type: String,
    },
});

const router = useRouter();
</script>
