import partytown from '@astrojs/partytown'
import { defineConfig } from 'astro/config'
import og from './src/utils/open-graph'

// https://astro.build/config
export default defineConfig({
  site: 'https://hokageCV.github.io',
  integrations: [partytown(), og()],
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'solarized-dark',
        dark: 'solarized-dark',
      },
      wrap: true,
    },
  },
})
