<script setup lang="ts">
import type { Config } from 'vue-craftcms'
import { CraftPage } from 'vue-craftcms'
import Home from '~/templates/pages/home.vue'
import News from '~/templates/pages/news.vue'
/* import Error404 from '~/templates/pages/404.vue' */

import ImageText from '~/templates/components/imageText.vue'
import Headline from '~/templates/components/headline.vue'

const mapping: Config = {
  pages: {
    'home': Home,
    'news:home': News,
  },
  components: {
    imageText: ImageText,
    headline: Headline,
  },
}

const uri = useCraftUri()
console.log(uri.value)
const currentSite = useCraftCurrentSite()
console.log(currentSite.value)

const { data: entry } = await useCraftEntry().uri(uri.value).site(currentSite.value.handle).one()
console.log(entry.value)

const { data, error } = await useCraftQuery('entries').uri(uri.value).site(currentSite.value.handle).one()
if (error.value) {
  console.error(error.value)
}

console.log(data.value)
</script>

<template>
  <div>
    <CraftPage
      v-if="data"
      :config="mapping"
      :content="data"
    />
  </div>
</template>
