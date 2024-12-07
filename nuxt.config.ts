// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    apollo: {
        autoImports: true,
        clients: {
            default: { httpEndpoint: import.meta.env.API_URL + '/graphql' },
        },
    },
    app: {
        layoutTransition: { mode: 'out-in', name: 'layout' },
        pageTransition: { mode: 'out-in', name: 'page' },

        head: {
            script: [{
                src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/pdfmake.min.js",
                defer: true
            }, {
                src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/vfs_fonts.min.js",
                defer: true
            }]
        }
    },
    colorMode: { classSuffix: '' },
    compatibilityDate: '2024-04-03',
    devtools: { enabled: import.meta.env.DEVTOOLS !== 'false' },
    eslint: {
        config: {
            stylistic: {
                indent: 'tab',
                semi: true,
            },
        },
    },
    future: { compatibilityVersion: 4 },
    imports: { dirs: ['~/stores', '~/utils', '~/composables/*/*.{ts,js}'] },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/apollo',
        'shadcn-nuxt',
        '@nuxtjs/color-mode',
        '@nuxt/icon',
        '@nuxt/eslint',
        '@formkit/auto-animate/nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/image',
        '@nuxt/fonts',
    ],
    postcss: {
        plugins: {
            autoprefixer: {},
            tailwindcss: {},
        },
    },
    runtimeConfig: {
        public: {
            API_URL: import.meta.env.API_URL,
        },
    },
    shadcn: {
        componentDir: './web/components/ui',
        prefix: '',
    },
    srcDir: 'web/',
    tailwindcss: { cssPath: '~/assets/css/main.css' },
})