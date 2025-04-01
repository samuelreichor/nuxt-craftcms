export default defineNuxtConfig({
  modules: ['../src/module'],

  craftcms: {
    baseUrl: 'https://backend-craftcms.ddev.site:8443',
    authToken: 'Bearer tyE9LViYm0HvcVbUErN1wwIa3qyeby1K',
    debug: true,
    siteDetectionMode: 'path',
    siteMap: [
      {
        handle: 'en',
        path: '/en',
        origin: 'http://localhost:3000/en',
        id: 1,
      },
      {
        handle: 'de',
        path: '/',
        origin: 'http://localhost:3000',
        id: 2,
      },
      {
        handle: 'es',
        path: '/es',
        origin: 'http://localhost:3000/es',
        id: 3,
      },
    ],
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-10-10',

  routeRules: {
    '/': { prerender: true },
  },
})
