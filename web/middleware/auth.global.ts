// import { sidebarLinks } from '~/composables/useLinks';

export default defineNuxtRouteMiddleware((to) => {
    // const auth = useAuth();
    // const noAuthRoutes = ['index', 'login', 'register'];
    // const currentRoute = to?.name?.toString();
    //
    // if (!auth.user.id) {
    //     if (!noAuthRoutes.includes(currentRoute ?? '')) {
    //         return navigateTo('/login');
    //     }
    // } else {
    //     if (noAuthRoutes.includes(currentRoute ?? '')) {
    //         return navigateTo('/dashboard');
    //     }
    //     const roleAccess = sidebarLinks.reduce((acc: any, link) => {
    //         acc[link.path] = link.roles;
    //         return acc;
    //     }, {});
    //
    //     const requiredRoles = roleAccess[to.path];
    //
    //     if (requiredRoles && !requiredRoles.includes(auth.user.role)) {
    //         return navigateTo('/dashboard');
    //     }
    // }
});
