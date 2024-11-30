import partytown from '@astrojs/partytown'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://hokageCV.github.io',
  integrations: [partytown()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'solarized-dark',
        dark: 'solarized-dark',
      },
      wrap: true,
    },
  },
  trailingSlash: 'never',
})
