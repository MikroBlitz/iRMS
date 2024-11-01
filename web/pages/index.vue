<template>
    <div
        class="h-screen w-screen flex flex-col items-center justify-center relative"
    >
        <Head>
            <Title>APP</Title>
        </Head>

        <div v-if="showContent" class="absolute top-6 left-6">
            <div class="flex items-center justify-center gap-2">
                <DisplayMode />
                <NuxtLink :to="auth.user.id ? '/dashboard' : '/login'">
                    <Button class="w-[100px] bg-primary dark:bg-secondary">
                        {{ auth.user.id ? 'Dashboard' : 'Login' }}
                    </Button>
                </NuxtLink>
            </div>
        </div>

        <div
            class="flex flex-col justify-center items-center w-full h-full overflow-hidden"
        >
            <div
                v-if="showContent"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[75vh] w-[90vw] mx-auto"
            >
                <div
                    v-for="item in items"
                    class="feature-section bg-cover bg-center hover:scale-105 transition-transform duration-300"
                    :style="{ backgroundImage: `url(${item.image})` }"
                >
                    <div
                        class="bg-black bg-opacity-90 p-5 text-center text-white"
                    >
                        <h1 class="text-xl lg:text-2xl">
                            {{ item.title }}
                        </h1>
                    </div>
                </div>
            </div>

            <div v-else class="flex justify-center items-center h-full w-full">
                <img alt="img" src="../assets/backg.gif" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';

const auth = useAuth();
const showContent = ref(false);

onMounted(() => {
    setTimeout(() => {
        showContent.value = true;
    }, 2000);
});

const items = [
    {
        title: 'Fast and Reliable',
        image: 'https://i.imgur.com/UULsFJV.png',
    },
    {
        title: 'Easy-to-use Interface',
        image: 'https://i.imgur.com/1tZB8Qw.png',
    },
    {
        title: 'Secure and Encrypted',
        image: 'https://i.imgur.com/mCSSn0K.png',
    },
    {
        title: '24/7 Customer Support',
        image: 'https://i.imgur.com/nJ2qOhw.png',
    },
];

definePageMeta({
    layout: false,
});
</script>
