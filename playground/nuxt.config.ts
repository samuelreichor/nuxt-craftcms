export default defineNuxtConfig({
  modules: ['../src/module'],

  craftcms: {
    baseUrl: 'https://backend-craftcms.ddev.site',
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-10-10',
})
