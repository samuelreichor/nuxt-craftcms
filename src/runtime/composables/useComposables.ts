import { siteDetectionMode, type CraftCmsOptions, type SiteDetectionMode } from 'vue-craftcms'
import { getCurrentSite, getSiteUri } from '../utils/helper'
import { useRuntimeConfig, useRoute, createError, useRequestURL } from '#app'
import { computed } from '#imports'

export function useCraftFullUrl() {
  const useRequest = useRequestURL()
  return computed(() => useRequest.href)
}

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
  return computed(() => (mode === siteDetectionMode.PATH ? useRoute().path : useCraftFullUrl().value))
}
