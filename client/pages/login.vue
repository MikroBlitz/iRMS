<template>
    <div class="min-h-screen flex flex-col justify-center bg-gray-900/20">
        <div
            class="container bg-transparent md:bg-gray-800/70 rounded-xl mx-auto flex flex-col md:flex-row items-center justify-center p-6 md:p-36 md:space-y-0"
        >
            <div
                class="md:flex-1 flex flex-col items-center text-center md:text-left p-2 mb-4"
            >
                <img
                    src="../assets/application_logo.svg"
                    alt="Logo"
                    class="mb-2 w-24 md:w-48"
                />
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                    POS SYSTEM
                </h1>
                <p class="text-gray-200 max-w-md">
                    Welcome to POS System! Please log in to streamline your
                    <span class="text-emerald-400"
                        >sales, manage inventory,</span
                    >
                    and enhance your
                    <span class="text-emerald-400">customer experience.</span>
                    Let's get started!
                </p>
            </div>

            <div
                class="md:flex-1 max-w-full w-[400px] md:max-w-lg bg-gray-800 md:bg-gray-900/50 p-12 rounded-lg shadow-lg mx-4 md:mx-0"
            >
                <h2 class="text-2xl font-semibold text-center text-white mb-6">
                    Sign In
                </h2>
                <div class="mb-4">
                    <label for="email" class="text-gray-300">Username</label>
                    <input
                        id="email"
                        v-model="credentials.email"
                        type="email"
                        class="block w-full mt-1 p-2 px-3 bg-gray-700 text-white border-none rounded-md focus:ring-yellow-500 focus:ring-2 text-base placeholder-gray-400"
                        placeholder="Enter your username"
                        required
                        autofocus
                    />
                </div>

                <div class="mb-6">
                    <label for="password" class="text-gray-300">Password</label>
                    <input
                        id="password"
                        v-model="credentials.password"
                        type="password"
                        class="block w-full mt-1 p-2 bg-gray-700 px-3 text-white border-none rounded-md focus:ring-yellow-500 focus:ring-2 text-base placeholder-gray-400"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <div class="flex items-center justify-between mb-6">
                    <label for="remember" class="inline-flex items-center">
                        <input
                            id="remember"
                            v-model="credentials.remember"
                            type="checkbox"
                            class="text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                        />
                        <span class="ml-2 text-sm text-gray-400"
                            >Remember me</span
                        >
                    </label>
                </div>

                <Button
                    :disabled="loading"
                    class="w-full bg-emerald-700"
                    @click.prevent="login"
                >
                    <SpinnerTadpole
                        :class="{ hidden: !loading }"
                        class="size-7 text-card dark:text-card-foreground mx-1"
                    />
                    <span
                        class="font-bold"
                        :class="{ 'animate-pulse ml-2': loading }"
                        >{{ loading ? 'Logging in' : 'Login' }}</span
                    >
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const auth = useAuth();
const loading = ref(false);
const errors = ref(null);
const router = useRouter();

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
        router.push('/dashboard');
    } catch (error: any) {
        console.error(error);
        const message =
            error.response?.data?.message ||
            'An error occurred. Please try again.';
        toasts(message, {
            type: 'error',
            position: 'top-center',
            autoClose: 3000,
            transition: 'zoom',
            hideProgressBar: true,
        });
    } finally {
        loading.value = false;
    }
};

definePageMeta({
    middleware: ['guest'],
});
</script>
