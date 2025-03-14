import { siteDetectionMode, type CraftCmsOptions, type SiteDetectionMode } from 'vue-craftcms'
import { getCurrentSite, getSiteUri } from '../utils/helper'
import { useRuntimeConfig, useRoute, createError, useRequestURL } from '#app'
import { computed } from '#imports'

export function useCraftCurrentSite() {
  const { siteMap, siteDetectionMode } = useRuntimeConfig().public.craftcms as Required<CraftCmsOptions>
  if (!siteMap || siteMap.length === 0) {
    throw createError({ statusCode: 500, statusMessage: 'Invalid sitemap in app.config.ts' })
  }

  const url = useUrlByMatching(siteDetectionMode)
  return computed(() => getCurrentSite(siteMap, url, siteDetectionMode))
}

export function useCraftUri() {
  const { siteDetectionMode } = useRuntimeConfig().public.craftcms as Required<CraftCmsOptions>
  const currentSite = useCraftCurrentSite()
  return computed(() => getSiteUri(useUrlByMatching(siteDetectionMode), currentSite, siteDetectionMode))
}

function useUrlByMatching(mode: SiteDetectionMode) {
  const useRequest = useRequestURL()
  const route = useRoute()
  const fullUrl = computed(() => useRequest.href)
  const fullRoute = computed(() => route.path)
  return mode === siteDetectionMode.PATH ? fullRoute : fullUrl
}
