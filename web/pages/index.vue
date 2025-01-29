<template>
    <div
        class="relative min-h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
        <Head>
            <Title>APP</Title>
        </Head>

        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute top-0 -left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full filter blur-3xl"
            />
            <div
                class="absolute bottom-0 -right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full filter blur-3xl"
            />
        </div>

        <div
            v-if="showContent"
            class="absolute top-6 left-6 z-10 animate-fade-in"
        >
            <DisplayMode />
        </div>

        <div
            class="relative flex flex-col items-center justify-center min-h-screen px-4"
        >
            <div
                v-if="showContent"
                class="max-w-6xl w-full mx-auto animate-fade-in"
            >
                <div class="flex justify-center mb-4">
                    <NuxtImage
                        src="/landing/application_logo.png"
                        class="w-24 md:w-32 transform hover:scale-105 transition-transform"
                        alt="APP Logo"
                    />
                </div>

                <div class="text-center mb-4">
                    <h1
                        class="text-3xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
                    >
                        <span
                            class="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 text-transparent bg-clip-text"
                        >
                            Empower business with<br />
                            Retail Management System
                        </span>
                    </h1>
                    <p
                        class="text-gray-600 dark:text-gray-300 text-sm md:text-xl max-w-2xl mx-auto transition-colors"
                    >
                        POS, Inventory, Sales, Messaging, Customer Management,
                        <span class="text-emerald-600 dark:text-emerald-400"
                            >fully customizable</span
                        >
                        and more.
                    </p>
                </div>

                <ClientOnly>
                    <div class="relative w-full max-w-5xl mx-auto px-4">
                        <div class="relative">
                            <div
                                class="relative bg-[#353535] dark:bg-[#252525] rounded-lg md:rounded-2xl pt-[1.5%] px-[1.5%] pb-[1.5%] shadow-2xl"
                            >
                                <div
                                    class="absolute top-0 left-1/2 -translate-x-1/2 w-[40px] md:w-[80px] h-[8px] md:h-[15px] bg-[#252525] dark:bg-[#1a1a1a] rounded-b md:rounded-b-lg z-10"
                                />

                                <div
                                    class="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
                                >
                                    <video
                                        autoplay
                                        loop
                                        muted
                                        class="w-full h-full"
                                        :class="{
                                            'animate-fade-in': showContent,
                                        }"
                                    >
                                        <source :src="video" type="video/mp4" />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                </div>
                            </div>

                            <div
                                class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-lg md:rounded-2xl pointer-events-none"
                            />
                        </div>
                    </div>
                </ClientOnly>

                <div
                    class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8 px-4"
                >
                    <NuxtLink
                        :to="auth.user.id ? '/dashboard' : '/login'"
                        class="w-full md:w-auto"
                    >
                        <Button
                            class="w-full md:w-64 py-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300"
                        >
                            {{ auth.user.id ? 'Dashboard' : 'Login' }}
                        </Button>
                    </NuxtLink>

                    <Button
                        :disabled="demoLoading"
                        class="w-full md:w-64 py-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-50"
                        @click.prevent="demo"
                    >
                        <div class="flex items-center justify-center gap-2">
                            <SpinnerTadpole
                                v-if="demoLoading"
                                class="w-6 h-6 text-white"
                            />
                            <span :class="{ 'animate-pulse': demoLoading }">
                                {{ demoLoading ? 'Loading...' : 'Try Demo' }}
                            </span>
                        </div>
                    </Button>
                </div>
            </div>

            <div
                v-else
                class="flex justify-center items-center h-screen w-full"
            >
                <img
                    alt="Loading"
                    src="../assets/backg.gif"
                    class="max-w-full h-auto"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core';
import { Button } from '~/components/ui/button';
import video from '/landing/landing-video.mp4';

const auth = useAuth();
const showContent = ref(false);
const demoLoading = ref(false);

onMounted(() => useTimeoutFn(() => (showContent.value = true), 1000));

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

<style>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
}

.transition-colors {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>
