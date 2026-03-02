import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from "@astrojs/sitemap";
import expressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hokageCV.github.io',
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
      themes: ['solarized-dark'],
      defaultProps: {
        showCopyButton: true,
        wrap: true
      }
    }),
    mdx({
      remarkRehype: {
        footnoteLabelTagName: 'hr',
        footnoteLabel: '',
        footnoteLabelProperties: { className: ['footnotes'] }
      }
    }),
  ]
});
