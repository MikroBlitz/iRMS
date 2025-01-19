import { defineStore } from 'pinia';
import { upsertLog } from '~/graphql/Log';
import axios from '~/plugins/axios';

const $axios = axios().provide.axios;

export const useAuth = defineStore(
    'auth',
    () => {
        // State
        const user = reactive({
            first_name: '',
            id: '',
            last_name: '',
            middle_name: '',
            name: '',
            role: null,
        });

        // Actions
        const getTokens = async () => {
            await $axios.get('/sanctum/csrf-cookie');
        };
        const getUser = async () => {
            const response = await $axios.get('/api/authenticated-user');
            const userData = response.data[0];
            user.id = userData.id;
            user.role = userData.role;
            user.first_name = userData.first_name;
            user.middle_name = userData.middle_name;
            user.last_name = userData.last_name;
            user.name = userData.name;
        };
        const login = async (email: string, password: string) => {
            try {
                resetUser();
                await $axios.post('/login', { email, password });
            } catch (error) {
                console.error('Login failed:', error);
            } finally {
                const response = await $axios.get('/api/authenticated-user');
                const userId = response.data[0].id;
                const { mutate } = useMutation(upsertLog);
                const log = authLogs(userId, 'Login');

                await mutate({ input: log });
            }
        };
        const logout = async () => {
            try {
                const response = await $axios.get('/api/authenticated-user');
                const userId = response.data[0].id;
                const { mutate } = useMutation(upsertLog);
                const log = authLogs(userId, 'Logout');
                await mutate({ input: log });

                await $axios.post('/logout');
            } catch (error) {
                console.error('Logout failed:', error);
            } finally {
                resetUser();
                navigateTo('/');
            }
        };
        const resetUser = () => {
            user.id = '';
            user.role = null;
            user.first_name = '';
            user.middle_name = '';
            user.last_name = '';
            user.name = '';
        };

        return {
            getTokens,
            getUser,
            login,
            logout,
            resetUser,
            user,
        };
    },
    {
        persist: true,
    },
);
