export default defineNuxtConfig({
  modules: ['../src/module'],

  craftcms: {
    baseUrl: 'https://backend-craftcms.ddev.site:8443',
    siteMap: [
      {
        handle: 'en',
        id: 1,
        origin: 'http://localhost:3000/en',
      },
      {
        handle: 'de',
        id: 2,
        origin: 'http://localhost:3000',
      },
      {
        handle: 'es',
        id: 3,
        origin: 'http://localhost:3000/es',
      },
    ],
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-10-10',
})
