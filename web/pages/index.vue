<template>
    <div
        class="h-screen w-screen flex flex-col items-center justify-center relative"
    >
        <Head>
            <Title>APP</Title>
        </Head>

        <div v-if="showContent" class="absolute top-6 left-6">
            <DisplayMode />
        </div>

        <div
            class="flex flex-col justify-center items-center w-full h-full overflow-hidden"
        >
            <div
                v-if="showContent"
                class="flex flex-col items-center justify-center max-w-[1200px] p-6 w-full h-auto"
            >
                <div class="w-full">
                    <div>
                        <NuxtImage
                            src="/landing/application_logo.png"
                            class="w-32"
                        />
                    </div>

                    <div>
                        <link
                            href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap"
                            rel="stylesheet"
                        />
                        <h1
                            class="text-xl md:text-[3em] leading-tight extrabold-font text-center mb-4 bg-gradient-to-b from-emerald-500 to-indigo-500 text-transparent bg-clip-text"
                        >
                            Empower your business with<br />
                            Retail Management system
                        </h1>

                        <div
                            class="border-2 border-secondary rounded-full mb-1 py-2"
                        >
                            <p
                                class="flex justify-center items-center text-center"
                            >
                                POS, Inventory, Sales, Messaging, Customer
                                Management, fully customizable and more.
                            </p>
                        </div>
                    </div>

                    <div
                        v-if="loading"
                        class="flex justify-center items-center w-full"
                    >
                        <Skeleton
                            class="w-full h-[300px] md:h-[580px] rounded-xl"
                        />
                    </div>
                    <div v-else>
                        <video
                            autoplay
                            loop
                            muted
                            class="rounded-md md:rounded-xl border-2 border-secondary shadow-md shadow-gray-500 dark:shadow-black"
                        >
                            <source
                                src="/landing/landing-video.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <div
                    class="md:flex md:space-x-4 space-y-2 md:space-y-0 items-center justify-center mt-8 w-full"
                >
                    <NuxtLink :to="auth.user.id ? '/dashboard' : '/login'">
                        <Button
                            class="shadow-md shadow-gray-500 dark:shadow-primary bg-emerald-700 font-bold w-full md:w-60 py-6 rounded-xl transition duration-300 hover:bg-emerald-500"
                        >
                            {{ auth.user.id ? 'Dashboard' : 'Login' }}
                        </Button>
                    </NuxtLink>
                    <Button
                        :disabled="demoLoading"
                        class="shadow-md shadow-gray-500 dark:shadow-primary bg-indigo-800 w-full md:w-60 py-6 rounded-xl transition duration-300 hover:bg-indigo-500"
                        @click.prevent="demo"
                    >
                        <SpinnerTadpole
                            :class="{ hidden: !demoLoading }"
                            class="size-7 text-card dark:text-card-foreground mx-1"
                        />
                        <span
                            class="font-bold"
                            :class="{ 'animate-pulse ml-2': demoLoading }"
                            >{{ demoLoading ? 'Loading...' : 'Try Demo' }}</span
                        >
                    </Button>
                </div>
            </div>

            <div v-else class="flex justify-center items-center h-full w-full">
                <img alt="img" src="../assets/backg.gif" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core';
import { Button } from '~/components/ui/button';

const auth = useAuth();
const showContent = ref(false);
const demoLoading = ref(false);
const loading = ref(true);

onMounted(() => useTimeoutFn(() => (showContent.value = true), 1000));
onMounted(() => useTimeoutFn(() => (loading.value = false), 3000));

definePageMeta({
    layout: false,
});

const demo = () => {
    demoLoading.value = true;
    useTimeoutFn(() => {
        demoLoading.value = false;
        navigateTo('/dashboard');
    }, 3000);
};
</script>

<style scoped>
.extrabold-font {
    font-family: 'Poppins';
    font-weight: 700;
}
</style>
