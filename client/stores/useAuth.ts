import { defineStore } from 'pinia';
import axios from '~/plugins/axios';

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
            await $axios.post('/login', {
                email: email,
                password: password,
            });
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
            this.resetUser();
            await $axios.post('/logout');
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
