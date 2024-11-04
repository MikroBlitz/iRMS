import { defineStore } from 'pinia';
import axios from '~/plugins/axios';
import { upsertLog } from '~/graphql/Log.ts';

const $axios = axios().provide.axios;

export const useAuth = defineStore('auth', {
    state: () => ({
        user: {
            id: '',
            role: null,
            first_name: '',
            middle_name: '',
            last_name: '',
            name: '',
        },
    }),
    actions: {
        async getTokens() {
            await $axios.get('/sanctum/csrf-cookie');
        },
        async login(email: string, password: string) {
            this.resetUser();
            try {
                await $axios.post('/login', {
                    email: email,
                    password: password,
                });
            } catch (error) {
                console.error('Login failed:', error);
            } finally {
                const response = await $axios.get('/api/authenticated-user');
                const userId = response.data[0].id;
                const { mutate } = useMutation(upsertLog);
                const logInput = {
                    ip_address: '127.0.0.1',
                    browser: 'Test',
                    event: 'login',
                    user: {
                        connect: userId.toString(),
                    },
                };
                await mutate({ input: logInput });
            }
        },
        async getUser() {
            const response = await $axios.get('/api/authenticated-user');

            this.$state.user.id = response.data[0].id;
            this.$state.user.role = response.data[0].role;
            this.$state.user.first_name = response.data[0].first_name;
            this.$state.user.middle_name = response.data[0].middle_name;
            this.$state.user.last_name = response.data[0].last_name;
            this.$state.user.name = response.data[0].name;
            // console.log(response.data[0]);
        },
        async logout() {
            try {
                const response = await $axios.get('/api/authenticated-user');
                const userId = response.data[0].id;
                const { mutate } = useMutation(upsertLog);
                const log = {
                    ip_address: '127.0.0.1',
                    browser: 'Test',
                    event: 'logout',
                    user: {
                        connect: userId.toString(),
                    },
                };

                await mutate({ input: log });
            } catch (error) {
                console.error('Logout failed:', error);
            } finally {
                this.resetUser();
                await $axios.post('/logout');
            }
        },
        resetUser() {
            this.$state.user.id = '';
            this.$state.user.role = null;
            this.$state.user.first_name = '';
            this.$state.user.middle_name = '';
            this.$state.user.last_name = '';
            this.$state.user.name = '';
        },
    },
    persist: true,
});
