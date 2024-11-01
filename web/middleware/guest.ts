export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuth();

    if (auth.user.id) {
        return navigateTo('/dashboard');
    }
});
