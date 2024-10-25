import { useAuth } from '~/stores/useAuth';
import type { AuthState } from '~/types';

export const checkAuth = (allowedRoles: number[] = [1, 3]) => {
    const auth: AuthState = useAuth();
    return allowedRoles.includes(auth.user.role);
};
