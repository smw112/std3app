import colors from 'vuetify/es5/util/colors'

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    srcDir: 'src/',

    // ホットリロードを有効にする https://sunday-morning.app/posts/2020-11-30-docker-nuxt-js-hot-reload
    watchers: {
        webpack: {
            poll: true,
        }
    },
    server: {
        port: 4000, // デフォルト: 3000
        host: '0.0.0.0', // デフォルト: localhost
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - miniapp',
        title: 'miniapp',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:500,700',
                'data-viewport-units-buggyfill': 'ignore',
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@700&display=swap',
                'data-viewport-units-buggyfill': 'ignore',
            },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        // './assets/css/main.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

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
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/date-fns',
    ],

    axios: {
        baseURL: 'https://std3app.herokuapp.com',
    },

    auth: {
        redirect: {
            login: '/login', // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
            logout: '/login', // ログアウト時のリダイレクトURL
            callback: false, // Oauth認証等で必要となる コールバックルート
            home: false // ログイン後のリダイレクトURL
        },
        localStorage: false,
        strategies: {
            local: {
                token: {
                    type: 'Bearer',
                    property: 'access_token',
                },
                user: {
                    property: false
                },
                endpoints: {
                    login: { url: '/api/login', method: 'post', propertyName: 'access_token' },
                    logout: false,
                    user: { url: '/api/profile', method: 'get', propertyName: false }
                },
                tokenRequired: true,
                tokenType: 'bearer'
            }
        }
    },

    router: {
        middleware: ['auth'],
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        treeShake: true,
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                },
                light: {
                    primary: '#3894FF',
                    secondary: '#424242',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    // Github Pages
    router: {
        base: '/std3app/'
    },
    generate: {
        dir: 'docs'
    },
}
