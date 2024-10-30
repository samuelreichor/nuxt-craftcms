<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCraftQuery } from '../src/runtime/composables/useCraftQuery'

const data = ref()
const news = ref()
const entryQuery = useCraftQuery('entries')

// Fetch in setup function
onMounted(async () => {
  const { data: initialData, error: initialError } = await entryQuery.slug('home').one()

  if (initialError.value) {
    console.error(initialError.value)
  }

  data.value = initialData.value
})

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
