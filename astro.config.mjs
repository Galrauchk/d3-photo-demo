// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://d3-photo-demo.netlify.app',
  integrations: [sitemap({
    filter: (page) =>
      !page.includes('/politique-confidentialite') &&
      !page.includes('/politique-cookies'),
  })],
});
