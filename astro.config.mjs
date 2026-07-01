import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from "@astrojs/sitemap";
import expressiveCode from 'astro-expressive-code';
import { pluginLanguageLogo } from 'ec-lang-logo';
import pagefind from "astro-pagefind";
import { defineConfig } from 'astro/config';
import og from './src/utils/open-graph'

export default defineConfig({
  site: 'https://chaitanyavaru.com',
  trailingSlash: 'never',
  markdown: {
    remarkRehype: {
      footnoteLabelTagName: 'hr',
      footnoteLabel: '',
      footnoteLabelProperties: { className: ['footnotes'] }
    }
  },
  integrations: [
    partytown(),
    sitemap(),
    expressiveCode({
      themes: ['material-theme'],
      defaultProps: {
        showCopyButton: true,
        wrap: true
      },
      plugins: [pluginLanguageLogo({ color: 'theme' })]
    }),
    mdx({
      remarkRehype: {
        footnoteLabelTagName: 'hr',
        footnoteLabel: '',
        footnoteLabelProperties: { className: ['footnotes'] }
      }
    }),
    pagefind({
      exclude: ['/til/**']
    }),
    og(),
  ]
});
