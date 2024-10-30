import { addPlugin, defineNuxtModule, addImportsDir, addComponent, createResolver } from '@nuxt/kit'
import type { CraftCmsOptions } from 'vue-craftcms'

export default defineNuxtModule<CraftCmsOptions>({
  meta: {
    name: 'nuxt-craftcms',
    configKey: 'craftcms',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    baseUrl: '',
    debug: false,
    registerComponents: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Optimize vite deps
    if (nuxt.options.vite.optimizeDeps) {
      nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
      nuxt.options.vite.optimizeDeps.include.push('vue-craftcms')
    }

    // Load options in runtime config
    nuxt.options.runtimeConfig.public.craftcms = options

    // Add core plugin
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Add auto imports for components
    const names = [
      'CraftCmsPage',
      'CraftCmsArea',
    ]
    for (const name of names) {
      addComponent({
        name: name,
        export: name,
        filePath: 'vue-craftcms',
      })
    }

    // Add composables
    addImportsDir(resolver.resolve('runtime/composables'))
  },
})
