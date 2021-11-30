import colors from 'vuetify/es5/util/colors';

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        // titleTemplate: '%s - nft-plus-studio',
        title: 'NFT+ Studio',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'We help people to generate, customize and deploy NFTs and Smart Contracts without coding',
            },
            { name: 'format-detection', content: 'telephone=no' },
            {
                name: 'msapplication-TileColor',
                content: '#da532c',
            },
            {
                name: 'theme-color',
                content: '#000000',
            },
            {
                property: 'og:type',
                content: 'website',
            },
            {
                property: 'og:url',
                content: 'https://app.nftplus.studio',
            },
            {
                property: 'og:title',
                content: 'NFT+ Studio',
            },
            {
                property: 'og:description',
                content:
                    'NFT+ Studio is a platform that allows anyone to generate, customize and deploy NFT collections and smart contracts without coding knowledge.',
            },
            {
                property: 'og:image',
                content:
                    'https://uploads-ssl.webflow.com/616d17f88acab6507439a0d2/617588e9453b275a53c60020_nft-plus-logo.png',
            },
            {
                property: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                property: 'twitter:url',
                content: 'https://app.nftplus.studio',
            },
            {
                property: 'twitter:title',
                content: 'NFT+ Studio',
            },
            {
                property: 'twitter:description',
                content:
                    'NFT+ Studio is a platform that allows anyone to generate, customize and deploy NFT collections and smart contracts without coding knowledge.',
            },
            {
                property: 'twitter:image',
                content:
                    'https://uploads-ssl.webflow.com/616d17f88acab6507439a0d2/617588e9453b275a53c60020_nft-plus-logo.png',
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'apple-touch-icon',
                type: '180x180',
                href: '/apple-touch-icon.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png',
            },
            {
                rel: 'manifest',
                href: '/site.webmanifest',
            },
            {
                rel: 'mask-icon',
                href: '"/safari-pinned-tab.svg',
                color: '#5bbad5',
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/storage'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: process.env.NUXT_ENV_API_URL,
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            name: 'NFT+ Studio',
            lang: 'en',
        },
    },

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {},

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        treeShake: true,
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    router: {
        middleware: ['load'],
    },
};
