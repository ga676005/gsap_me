// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-05-15',
  // eslint: {
  //   config: {
  //     stylistic: true
  //   },
  // },
  eslint: {
    config: {
      standalone: false, // https://eslint.nuxt.com/packages/module#custom-config-presets
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
})
