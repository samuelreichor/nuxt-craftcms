import { siteDetectionMode, type CraftCmsOptions, type SiteDetectionMode } from 'vue-craftcms'
import { defu } from 'defu'
import { getBearerToken, getCurrentSite, getSiteUri } from '../utils/helper'
import { useRuntimeConfig, useRoute, createError, useRequestURL, useFetch } from '#app'
import type { UseFetchOptions } from '#app'
import { computed, toValue } from '#imports'
import type { Ref } from '#imports'

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

export function useCraftFetch<T>(
  url: Ref<string> | string | (() => string),
  options?: UseFetchOptions<T>,
): ReturnType<typeof useFetch<T>> {
  const authToken = useAuthToken()

  const defaults: UseFetchOptions<T> = {
    key: toValue(url),
    headers: {
      Authorization: authToken,
    },
  }

  const params = defu(options, defaults)
  return useFetch(url, params) as ReturnType<typeof useFetch<T>>
}

export function useAuthToken() {
  const { authToken } = useRuntimeConfig().public.craftcms as Required<CraftCmsOptions>

  if (!authToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'CraftCMS Auth Token is missing. Please provide a valid token in your nuxt.config.ts.',
    })
  }

  return getBearerToken(authToken)
}

function useUrlByMatching(mode: SiteDetectionMode) {
  const useRequest = useRequestURL()
  const route = useRoute()
  const fullUrl = computed(() => useRequest.href)
  const fullRoute = computed(() => route.path)
  return mode === siteDetectionMode.PATH ? fullRoute : fullUrl
}
