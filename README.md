<div align="center">
	<a href="https://npmjs.com/package/nuxt-craftcms"  align="center">
		<img src="https://online-images-sr.netlify.app/assets/nuxt-craft.png"  alt="Vue craftcms banner">
	</a>
	<h1 align="center">nuxt-craftcms</h1>
  <p align="center">
    Write Craft CMS queries in nuxt, like in twig. 🚀🚀
  </p>
  <br />
</div>

<p align="center">
  <a href="https://npmjs.com/package/nuxt-craftcms">
    <img src="https://img.shields.io/npm/v/nuxt-craftcms/latest.svg?style=flat-square" alt="Nuxt craftcms latest version" />
  </a>
  <a href="https://npmjs.com/package/nuxt-craftcms" rel="nofollow">
    <img src="https://img.shields.io/npm/dt/nuxt-craftcms.svg?style=flat-square" alt="Nuxt craftcms downloads">
  </a>
</p>

> [!WARNING]  
> This npm package is still in production and important features may change.

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-craftcms
```

Add a craftcms config to your `nuxt.config.js` and replace the baseUrl with your Craft CMS url.

```typescript
import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  modules: ['nuxt-craftcms'],

  craftcms: {
    baseUrl: 'https://backend-craftcms.ddev.site'
  }
});
```

## Further Resources

- [Craft CMS Plugin](https://github.com/samuelreichor/craft-query-api)
- [Core JS Querybuilder](https://github.com/samuelreichor/js-craftcms-api)
- [Vue Craft](https://github.com/samuelreichor/vue-craftcms)

## Support

- Bugs or Feature Requests? [Submit an issue](/../../issues/new).

## Contributing

Contributions are welcome! <3
