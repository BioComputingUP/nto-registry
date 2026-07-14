// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// GitHub Pages project-site config. When a custom domain is attached later,
// change `site` to the new domain and set `base` to '/'.
export default defineConfig({
  site: 'https://gavinf97.github.io',
  base: '/ntra-registry/',
  integrations: [react()]
});