# nuxt-craftcms

## 1.1.0

### Minor Changes

- 910e677: Add ability to use generics to querybuilder composables and fix small type issue in `useCraftSeoMatic` composable

## 1.0.3

### Patch Changes

- b604ee8: Fix wrong export of helper composables and some naming and codestyle issues.

## 1.0.2

### Patch Changes

- b799c3d: Update vue-craftcms to get admin() user query.

## 1.0.1

### Patch Changes

- e6b00c8: Fix hydration error in useCraftFetch due to missing key in default fetch options.

## 1.0.0

### Major Changes

- 1254c24: Now you need to define an auth token in the plugin options. Otherwise your fetch will fail. This ensures that you only can query what you are supposed to query.
- 1254c24: Added an new useCraftFetch composable to fetch data from the craft query api with an auth token.
- 1254c24: Added new helper function to apply the bearer token in the correct format and add tests for it.
- 1254c24: Updated vue-craftcms library.

## 0.5.1

### Patch Changes

- 6139928: Remove early days warning in readme and update vue-craftcms

## 0.5.0

### Minor Changes

- ace6cc7: Add useCraftSeoMatic composable to get SeoMatic information quickly
- d782ac8: Update vue-craftcms to get new site detection method
- 3d32427: Fix context issue of useCraftCurrentSite composable

## 0.4.1

### Patch Changes

- 0f3ccb5: Update vue-craftcms to fix extraneous non-props error in craft area

## 0.4.0

### Minor Changes

- 0f85dfb: Add new composables for data queries

## 0.3.1

### Patch Changes

- d236f3c: Fix reactivity issues of useCraftUri and useCraftCurrentSite composabales
- Update vue-craftcms

## 0.3.0

### Minor Changes

- 85a2c8b: Add `useCraftFullUrl` composable to get the full absolute url
- 85a2c8b: Add `useCraftCurrentSite` composable to get the current site
- 85a2c8b: Add `useCraftUri` composable to get the correct uri based on the current site origin
- 1cebb05: Update vue-craftcms for sitemap option support

## 0.2.2

### Patch Changes

- 669f6dd: Update vue-craftcms to add search query.

## 0.2.1

### Patch Changes

- b82240f: Update vue-craftcms and add new config option. Update Readme.

## 0.2.0

### Minor Changes

- df25869: Fix wrong naming of the exported components and update vue-craftcms

## 0.1.2

### Patch Changes

- 515ab3c: Refactor useCraftQuery composable to use useAsyncData for more control

## 0.1.1

### Patch Changes

- ccab266: Add prepare script to the publish workflow

## 0.1.0

### Minor Changes

- c395642: Add basic functionality of useQueryBuilder
