import type { ElementType } from 'js-craftcms-api'
import { useCraftUrlBuilder } from 'vue-craftcms'
import { useAsyncData } from '#imports'

function fetchFn(url: string) {
  return useAsyncData(`craftcms:${url}`, () => $fetch(url))
}

export function useCraftQuery<T extends ElementType>(elementType: T) {
  const queryBuilder = useCraftUrlBuilder(elementType)

  return {
    ...queryBuilder,

    one() {
      const url = queryBuilder.buildUrl('one')
      return fetchFn(url)
    },

    all() {
      const url = queryBuilder.buildUrl('all')
      return fetchFn(url)
    },
  }
}

export function useCraftEntry() {
  return useCraftQuery<'entries'>('entries')
}

export function useCraftAddress() {
  return useCraftQuery<'addresses'>('addresses')
}

export function useCraftAsset() {
  return useCraftQuery<'assets'>('assets')
}

export function useCraftUser() {
  return useCraftQuery<'users'>('users')
}
