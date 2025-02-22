import type { CraftSites, CraftSite } from 'vue-craftcms'
import type { Ref } from 'vue'
import { reactive, toRaw } from 'vue'

export function getCurrentSite(siteMap: CraftSites, url: Ref<string>) {
  const normUrl = normalizeUrl(url.value)
  const sortedSiteMap = sortSitesByOrigin(siteMap)
  for (const site of sortedSiteMap) {
    if (normUrl.startsWith(normalizeUrl(site.origin))) {
      return site
    }
  }

  const site = siteMap[0]
  return {
    ...site,
  }
}

export function getSiteUri(url: Ref<string>, currentSite: Ref<CraftSite>): string {
  const normUrl = normalizeUrl(url.value)
    .split('#')[0] // Remove hash fragment
    .split('?')[0] // Remove query parameters
    .replace(normalizeUrl(currentSite.value.origin), '') // Remove origin
    .replace(/^\/+/, '') // Remove leading slashes
    .replace(/\/+$/, '') // Remove trailing slashes

  return normUrl === '' ? '__home__' : normUrl
}

export function normalizeUrl(url: string) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
}

export function sortSitesByOrigin(siteMap: CraftSites) {
  const rawSitemap = toRaw(siteMap)

  return reactive([...rawSitemap].sort((a, b) => b.origin.length - a.origin.length))
}
