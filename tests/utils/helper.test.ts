import { describe, it, expect } from 'vitest'
import { reactive } from 'vue'
import { getCurrentSite, getSiteUri, normalizeUrl, sortSitesByOrigin } from '../../src/runtime/utils/helper'

const mockSiteMap = [
  { handle: 'en', id: 1, origin: 'https://google.com' },
  { handle: 'de', id: 2, origin: 'https://google.com/de' },
  { handle: 'usa', id: 3, origin: 'https://google.com/usa' },
]

describe('getCurrentSite', () => {
  it('should return the correct site based on the URL', () => {
    const result = getCurrentSite(mockSiteMap, 'https://google.com/usa/page/slug')
    expect(result).toEqual({ handle: 'usa', id: 3, origin: 'https://google.com/usa' })
  })

  it('should return the first site if no match is found', () => {
    const result = getCurrentSite(mockSiteMap, 'https://unknown-site.com/page')
    expect(result).toEqual({ handle: 'en', id: 1, origin: 'https://google.com' }) // First entry as fallback
  })

  it('should return the longest matching origin first', () => {
    const extendedSiteMap = [
      { handle: 'en', id: 1, origin: 'https://example.com' },
      { handle: 'de', id: 2, origin: 'https://example.com/sub' },
    ]
    const result = getCurrentSite(extendedSiteMap, 'https://example.com/sub/page')
    expect(result).toEqual({ handle: 'de', id: 2, origin: 'https://example.com/sub' })
  })

  it('should handle URLs without protocol correctly', () => {
    expect(getCurrentSite(mockSiteMap, 'google.com/path')).toEqual({ handle: 'en', id: 1, origin: 'https://google.com' })
  })
})

describe('getSiteUri', () => {
  it('should return the correct URI relative to the origin', () => {
    const result = getSiteUri('https://google.com/some/path', 'https://google.com')
    expect(result).toBe('some/path')
  })

  it('should return "__home__" if the URL is the site root', () => {
    expect(getSiteUri('https://google.com', 'https://google.com')).toBe('__home__')
  })

  it('should remove multiple leading and trailing slashes', () => {
    expect(getSiteUri('https://google.com////path', 'https://google.com')).toBe('path')
  })

  it('should remove hash and query fragments', () => {
    expect(getSiteUri('https://google.com/page#section?test=1', 'https://google.com')).toBe('page')
  })

  it('should correctly handle a URI-encoded URL', () => {
    expect(getSiteUri('https://google.com/some%20very%2Fstrange%2Dpath', 'https://google.com'))
      .toBe('some%20very%2Fstrange%2Dpath')
  })
})

describe('normalizeUrl', () => {
  it('should remove the protocol (http/https)', () => {
    expect(normalizeUrl('https://example.com')).toBe('example.com')
    expect(normalizeUrl('http://example.com')).toBe('example.com')
  })

  it('should remove "www." prefix', () => {
    expect(normalizeUrl('https://www.example.com')).toBe('example.com')
  })

  it('should leave normal domains untouched', () => {
    expect(normalizeUrl('example.com')).toBe('example.com')
  })
})

describe('sortSitesByOrigin', () => {
  it('should sort sites by longest origin first', () => {
    const sortedSites = sortSitesByOrigin(mockSiteMap)

    const keys = sortedSites.map(site => site.handle)
    expect(keys).toEqual(['usa', 'de', 'en'])
  })

  it('should return a reactive object', () => {
    const sortedSites = sortSitesByOrigin(mockSiteMap)
    expect(sortedSites).toBeInstanceOf(Object)
    expect(reactive(sortedSites)).toBe(sortedSites)
  })

  it('should return an empty array if input is empty', () => {
    expect(sortSitesByOrigin([])).toEqual([])
  })

  it('should maintain order when origins have the same length', () => {
    const sameLengthMap = [
      { handle: 'a', id: 1, origin: 'https://aaa.com' },
      { handle: 'b', id: 2, origin: 'https://bbb.com' },
    ]
    expect(sortSitesByOrigin(sameLengthMap)).toEqual(sameLengthMap)
  })
})
