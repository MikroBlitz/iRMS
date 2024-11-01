<template>
    <div>
        <Head>
            <Title>{{ pageTitle }}</Title>
        </Head>
        <main v-auto-animate class="max-w-screen-2xl mx-auto">
            <TableHeader :title="pageTitle" :icon="icon" />
            <div class="flex flex-wrap gap-4 my-4 items-center justify-center">
                <Button class="p-4 bg-gray-400 w-40 rounded-full">
                    Form 1
                </Button>
                <Button class="p-4 bg-gray-400 w-40 rounded-full">
                    Form 2
                </Button>
                <Button class="p-4 bg-gray-400 w-40 rounded-full">
                    Form 3
                </Button>
                <Button class="p-4 bg-gray-400 w-40 rounded-full">
                    Form 4
                </Button>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';

definePageMeta({
    layout: 'app-layout',
});

const pageTitle = 'Online Forms';
const icon = 'mdi:form-select';
</script>
