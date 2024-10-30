import type { Ref } from 'vue'
import type { ElementType } from 'js-craftcms-api'
import { useCraftUrlBuilder } from 'vue-craftcms'
import { useFetch } from '#imports'

interface FetchResult<T = unknown> {
  data: Ref<T | null>
  error: Ref<unknown | null>
}

async function fetchFn(url: string): Promise<FetchResult> {
  const { data, error } = await useFetch(url)
  return { data, error }
}

export function useCraftQuery<T extends ElementType>(elementType: T) {
  const queryBuilder = useCraftUrlBuilder(elementType)

  return {
    ...queryBuilder,

    async one() {
      const url = queryBuilder.buildUrl('one')
      return await fetchFn(url)
    },

    async all() {
      const url = queryBuilder.buildUrl('all')
      return await fetchFn(url)
    },
  }
}
