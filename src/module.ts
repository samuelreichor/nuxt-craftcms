import { addPlugin, defineNuxtModule, addImports, addComponent, createResolver } from '@nuxt/kit'
import { defaultOptions, type CraftCmsOptions } from 'vue-craftcms'

export default defineNuxtModule<Required<CraftCmsOptions>>({
  meta: {
    name: 'nuxt-craftcms',
    configKey: 'craftcms',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: defaultOptions,
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
    const componentes = [
      'CraftPage',
      'CraftArea',
      'CraftNotImplemented',
    ]

    for (const name of componentes) {
      addComponent({
        name: name,
        export: name,
        filePath: 'vue-craftcms',
      })
    }

    // Add auto imports for composables
    const composables = [
      'useCraftFullUrl',
      'useCraftCurrentSite',
      'useCraftUri',
    ]

    for (const name of composables) {
      addImports({
        name: name,
        as: name,
        from: resolver.resolve('runtime/composables/useComposables'),
      })
    }

    addImports({
      name: 'useCraftQuery',
      as: 'useCraftQuery',
      from: resolver.resolve('runtime/composables/useCraftQuery'),
    })
  },
})
