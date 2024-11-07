<script setup lang="ts">
import { ref } from 'vue'
import { useCraftQuery } from '../src/runtime/composables/useCraftQuery'

const data = ref()
const news = ref()
const entryQuery = useCraftQuery('entries')

const { data: initialData, error: initialError } = await entryQuery.slug('home').one()

if (initialError.value) {
  console.error(initialError.value)
}

console.log(initialData.value)

// Fetch on clientside
async function loadNews() {
  const { data: dataNews, error: newsErr } = await entryQuery.slug('news-article-1').one()

  if (newsErr.value) {
    console.error(newsErr.value)
  }

  news.value = dataNews.value
}
</script>

<template>
  <div>
    <pre>
      {{ data }}
    </pre>
    <button @click="loadNews">
      Load news
    </button>
    <pre>
      {{ news }}
    </pre>
  </div>
</template>
