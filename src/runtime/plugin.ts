import { CraftCms } from 'vue-craftcms'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { craftcms } = useRuntimeConfig().public
  nuxtApp.vueApp.use(CraftCms, { ...craftcms })
})
