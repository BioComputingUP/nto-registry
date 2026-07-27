// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// Custom domain config. Served at the apex, so base is '/'.
export default defineConfig({
  site: 'https://nto-registry.org',
  base: '/',
  integrations: [react()]
});