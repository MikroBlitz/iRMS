import { useAuth } from '~/stores/useAuth';

export const checkAuth = (allowedRoles: number[] = [1, 3]) => {
    const auth: any = useAuth();
    return allowedRoles.includes(auth.user.role);
};
