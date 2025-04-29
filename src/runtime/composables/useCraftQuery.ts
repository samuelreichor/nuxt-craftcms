import type { ElementType, ExecutionMethod, QueryBuilder } from 'js-craftcms-api'
import { useCraftUrlBuilder } from 'vue-craftcms'
import { useCraftAuthToken } from './useComposables'
import { useAsyncData } from '#imports'
import type { AsyncData, NuxtError } from '#app'

function fetchFn<ResT>(url: string) {
  const authToken = useCraftAuthToken()
  return useAsyncData<ResT>(`craftcms:${url}`, () => $fetch(url, {
    headers: {
      Authorization: authToken,
    },
  }))
}

export type PickFrom<T, K extends Array<string>> = T extends Array<unknown> ? T : T extends Record<string, unknown> ? keyof T extends K[number] ? T : K[number] extends never ? T : Pick<T, K[number]> : T
export type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : never : never>

type ReturnType<ResT, T extends ElementType> = QueryBuilder<T> & {
  one(): AsyncData<PickFrom<ResT, KeysOf<ResT>> | null, NuxtError<unknown> | null>
  all(): AsyncData<PickFrom<ResT, KeysOf<ResT>> | null, NuxtError<unknown> | null>
  buildUrl(execOpt: ExecutionMethod): string
}

export function useCraftQuery<ResT, T extends ElementType>(elementType: T): ReturnType<ResT, T> {
  const queryBuilder = useCraftUrlBuilder(elementType)

  return {
    ...queryBuilder,

    one() {
      const url = queryBuilder.buildUrl('one')
      return fetchFn<ResT>(url)
    },

    all() {
      const url = queryBuilder.buildUrl('all')
      return fetchFn<ResT>(url)
    },
  } as ReturnType<ResT, T>
}

export function useCraftEntry<ResT>() {
  return useCraftQuery<ResT, 'entries'>('entries')
}

export function useCraftAddress<ResT>() {
  return useCraftQuery<ResT, 'addresses'>('addresses')
}

export function useCraftAsset<ResT>() {
  return useCraftQuery<ResT, 'assets'>('assets')
}

export function useCraftUser<ResT>() {
  return useCraftQuery<ResT, 'users'>('users')
}
