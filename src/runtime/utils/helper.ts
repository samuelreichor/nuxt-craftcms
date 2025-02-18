import type { CraftSiteValue, CraftSite } from 'vue-craftcms'
import { reactive, toRaw } from 'vue'

export function getCurrentSite(siteMap: CraftSite, url: string) {
  const normUrl = normalizeUrl(url)
  const sortedSiteMap = sortSitesByOrigin(siteMap)
  for (const key in sortedSiteMap) {
    const site = sortedSiteMap[key] as CraftSiteValue
    if (normUrl.startsWith(normalizeUrl(site.origin))) {
      return {
        handle: key,
        ...site,
      }
    }
  }
  const [handle, site] = Object.entries(siteMap)[0]
  return {
    handle,
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

export function sortSitesByOrigin(siteMap: CraftSite) {
  return reactive(
    Object.fromEntries(
      Object.entries(toRaw(siteMap))
        .sort(([, a], [, b]) => b.origin.length - a.origin.length),
    ),
  )
}
