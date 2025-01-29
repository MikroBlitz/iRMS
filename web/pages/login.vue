<template>
    <div
        class="min-h-dvh flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800"
    >
        <div class="container mx-auto px-4">
            <div
                class="relative justify-center flex flex-col md:flex-row items-center max-w-6xl mx-auto bg-gray-800/30 rounded-2xl backdrop-blur-sm p-2 md:p-12"
            >
                <NuxtLink
                    to="/"
                    class="absolute top-6 left-6 flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                    <Icon name="mdi:home" class="text-white" size="20" />
                </NuxtLink>

                <div
                    class="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0 md:pr-12"
                >
                    <NuxtImage
                        src="/landing/application_logo.png"
                        alt="Logo"
                        class="w-24 md:w-32 mx-auto md:mx-0 mb-6 transform hover:scale-105 transition-transform"
                    />
                    <h1
                        class="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight"
                    >
                        <span
                            class="bg-gradient-to-r from-emerald-600 to-indigo-600 dark:from-emerald-400 dark:to-indigo-400 text-transparent bg-clip-text"
                        >
                            APP
                        </span>
                    </h1>
                    <p
                        class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
                    >
                        Welcome to APP! With fully customizable themes and
                        components. It comes with
                        <span
                            class="text-emerald-600 dark:text-emerald-400 font-medium"
                            >POS, Inventory, Sales, Messaging,</span
                        >
                        and
                        <span
                            class="text-emerald-600 dark:text-emerald-400 font-medium"
                            >Customer Management.</span
                        >
                        <br />Let's get started!
                    </p>
                </div>

                <div class="w-full md:w-1/2 max-w-md">
                    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                        <h2
                            class="text-2xl font-bold text-white text-center mb-8"
                        >
                            Sign In
                        </h2>

                        <form class="space-y-4" @submit.prevent="login">
                            <div>
                                <label
                                    for="email"
                                    class="block text-sm font-medium text-gray-200 mb-1"
                                    >Username</label
                                >
                                <div class="relative">
                                    <input
                                        id="email"
                                        v-model="credentials.email"
                                        type="email"
                                        required
                                        class="w-full bg-white/5 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400"
                                        placeholder="Enter your username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    for="password"
                                    class="block text-sm font-medium text-gray-200 mb-1"
                                    >Password</label
                                >
                                <div class="relative">
                                    <input
                                        id="password"
                                        v-model="credentials.password"
                                        type="password"
                                        required
                                        class="w-full bg-white/5 mb-4 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                :disabled="loading"
                                class="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <div
                                    class="flex items-center justify-center space-x-2"
                                >
                                    <SpinnerTadpole
                                        v-if="loading"
                                        class="w-5 h-5 text-white"
                                    />
                                    <span>{{
                                        loading ? 'Logging in...' : 'Login'
                                    }}</span>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';

const auth = useAuth();
const loading = ref(false);
const errors = ref(null);

const keys = useMagicKeys();
const continueLogin: any = keys['Enter'];

const credentials = reactive({
    email: 'admin@mail.com',
    password: 'admin1234',
    remember: false,
});

const login = async () => {
    errors.value = null;
    loading.value = true;

    try {
        await auth.getTokens();
        await auth.login(credentials.email, credentials.password);
        await auth.getUser();
        if (auth.user.role == 2 || auth.user.role == 3)
            navigateTo('/pos/dashboard');
        else navigateTo('/dashboard');
    } catch (error: any) {
        console.error(error);
        const message =
            error.response?.data?.message ||
            'An error occurred. Please try again.';
        toasts(message, { type: 'error' });
    } finally {
        loading.value = false;
    }
};

definePageMeta({
    middleware: ['guest'],
});

watch(continueLogin, (e) => (e ? login() : null));
</script>
