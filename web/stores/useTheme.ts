import { defineStore } from 'pinia';

export const useTheme = defineStore('theme', {
    state: () => ({
        name: 'default',
    }),
    actions: {
        setTheme(theme: string) {
            this.$state.name = theme;
        },
    },
    persist: true,
});
