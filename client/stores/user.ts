import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        id: '',
        user: '',
    }),
    actions: {},
});
