import { defineStore } from 'pinia';

export const useTheme = defineStore(
    'theme',
    () => {
        // State
        const name = ref('default');

        // Actions
        const setTheme = (theme: string) => {
            name.value = theme;
        };

        return {
            name,
            setTheme,
        };
    },
    {
        persist: true,
    },
);
