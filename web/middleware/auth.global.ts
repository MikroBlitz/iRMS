import { sidebarLinks } from '~/composables/useLinks';

export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuth();
    const router = useRouter();

    const noAuthRoutes = ['index', 'login', 'register'];
    const currentRoute: any = to?.name;
    const validRoutes = router.getRoutes().map((route) => route.path);

    if (
        !validRoutes.includes(to?.path) &&
        !noAuthRoutes.includes(currentRoute)
    ) {
        return navigateTo('/dashboard');
    }

    console.log(auth.user.name || 'Guest'); // TODO: remove this line and uncomment below if the API is ready
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
