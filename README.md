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
    <img src="https://img.shields.io/npm/v/nuxt-craftcms?color=blue" alt="Nuxt craftcms latest version" />
  </a>
  <a href="https://npmjs.com/package/nuxt-craftcms" rel="nofollow">
    <img src="https://img.shields.io/npm/d18m/nuxt-craftcms?color=blue" alt="Nuxt craftcms downloads">
  </a>
  <a href="https://npmjs.com/package/nuxt-craftcms" rel="nofollow">
    <img src="https://img.shields.io/github/license/samuelreichor/nuxt-craftcms?color=blue" alt="Nuxt craftcms license">
  </a>
</p>


> [!WARNING]
> This package is no longer actively maintained. Please use the new **[`@query-api/nuxt`](https://github.com/samuelreichor/query-api/tree/main/packages/nuxt)** instead. It's designed to be a drop-in replacement.

-----

## Why the Change?

Hi there! If you've found this package, thanks so much for checking it out. I've recently re-evaluated my code architecture and decided to adopt a monorepo approach for all the JavaScript SDKs. This change allows for better maintainability and collaboration across related projects.

The package you're likely looking for is the new **[`@query-api/nuxt`](https://github.com/samuelreichor/query-api/tree/main/packages/nuxt)**. It's designed to seamlessly replace `nuxt-craftcms`.

-----

## Migration Guide

Migrating to the new package is straightforward:

1.  **Update Imports:** Replace all instances of `nuxt-craftcms` in your import statements with `@query-api/nuxt`.
    ```typescript
    // Before
    import { someFeature } from 'nuxt-craftcms';
    // After
    import { someFeature } from '@query-api/nuxt';
    ```
2.  **Update Nuxt Configuration:** In your `nuxt.config.ts` file, replace the module name `nuxt-craftcms` with `@query-api/nuxt`.
    ```typescript
    // nuxt.config.ts
    export default defineNuxtConfig({
      modules: [
        // Before
        // 'nuxt-craftcms',
        // After
        '@query-api/nuxt',
      ],
    });
    ```

-----

## Need Help?

I apologize for any inconvenience this transition may cause. If you encounter any issues during the migration or have questions, please don't hesitate to reach out\!

Happy coding!