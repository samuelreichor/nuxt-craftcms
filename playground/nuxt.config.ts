export default defineNuxtConfig({
  modules: ['../src/module'],

  craftcms: {
    baseUrl: 'https://backend-craftcms.ddev.site',
    debug: true,
    siteMap: {
      en: {
        id: 1,
        origin: 'http://localhost:3000/en',
      },
      de: {
        id: 2,
        origin: 'http://localhost:3000',
      },
      es: {
        id: 3,
        origin: 'http://localhost:3000/es',
      },
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-10-10',
})
