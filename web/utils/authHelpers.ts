import { useAuth } from '~/stores/useAuth';
import type { AuthState } from '~/types';

export const checkAuth = (allowedRoles: number[] = [1, 3]) => {
    const auth: AuthState = useAuth();
    return allowedRoles.includes(auth.user.role);
};

export const roles = [
    { id: 0, name: 'User' },
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Staff' },
    { id: 3, name: 'Store Manager' },
];
