<template>
    <Body class="antialiased">
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </Body>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import 'datatables.net-datetime';

const theme = useTheme();
const themeName = computed(() => theme.name);
const isMobile = ref(false);

useHead({
    bodyAttrs: { class: [themeName], id: 'app' },
    script: [
        {
            children: `
                if (window.innerWidth <= 768) {
                    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=0.9, maximum-scale=.9, user-scalable=no');
                } else {
                    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
                }
            `,
        },
    ],
    title: 'APP',
});

provide('isMobile', isMobile);

onMounted(() => {
    const mediaQuery = useMediaQuery('(max-width: 768px)');
    isMobile.value = mediaQuery.value;

    watch(mediaQuery, (newValue) => {
        isMobile.value = newValue;
    });
});
</script>
