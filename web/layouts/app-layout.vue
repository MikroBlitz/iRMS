<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
</script>

<template>
    <div class="h-dvh">
        <AppHeader />
        <div class="grid items-start">
            <div class="p-2">
                <slot />
            </div>
        </div>
    </div>
</template>
