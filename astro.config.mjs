import partytown from '@astrojs/partytown';
import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://hokageCV.github.io',
  integrations: [partytown(), sitemap()],
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'solarized-dark',
        dark: 'solarized-dark'
      },
      wrap: true
    }
  }
});
