import type { CraftSites } from 'vue-craftcms'
import { reactive, toRaw } from 'vue'

export function getCurrentSite(siteMap: CraftSites, url: string) {
  const normUrl = normalizeUrl(url)
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

export function getSiteUri(url: string, currentOrigin: string): string {
  const normUrl = normalizeUrl(url)
    .split('#')[0] // Remove hash fragment
    .split('?')[0] // Remove query parameters
    .replace(normalizeUrl(currentOrigin), '') // Remove origin
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
