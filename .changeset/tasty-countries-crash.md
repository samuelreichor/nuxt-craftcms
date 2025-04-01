---
"nuxt-craftcms": major
---

Now you need to define an auth token in the plugin options. Otherwise your fetch will fail. This ensures that you only can query what you are supposed to query.

Added an new useCraftFetch composable to fetch data from the craft query api with an auth token.

Added new helper function to apply the bearer token in the correct format and add tests for it.

Updated vue-craftcms library.
