import type { CraftCmsOptions } from 'vue-craftcms'
import { getCurrentSite, getSiteUri } from '../utils/helper'
import { useRuntimeConfig, useRoute, useRequestURL, createError } from '#app'
import { watch, computed, ref } from '#imports'

export function useCraftFullUrl() {
  const route = useRoute()
  const fullUrl = ref(import.meta.server ? useRequestURL().href : window.location.href)

  watch(route, () => {
    fullUrl.value = import.meta.server ? useRequestURL().href : window.location.href
  })

  return fullUrl
}

export function useCraftCurrentSite() {
  const { siteMap } = useRuntimeConfig().public.craftcms as CraftCmsOptions
  if (!siteMap) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Please ensure that a valid sitemap is defined in your app.config.ts file.',
    })
  }

  const fullUrl = useCraftFullUrl()

  return computed(() => getCurrentSite(siteMap, fullUrl))
}

export function useCraftUri() {
  const { siteMap } = useRuntimeConfig().public.craftcms as CraftCmsOptions
  if (!siteMap) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Please ensure that a valid sitemap is defined in your app.config.ts file.',
    })
  }
  const fullUrl = useCraftFullUrl()
  const currentSite = useCraftCurrentSite()
  return computed(() => getSiteUri(fullUrl, currentSite))
}
