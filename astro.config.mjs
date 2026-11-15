import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { config } from './src/config.mjs';
import rehypeFigure from './src/plugins/rehype-figure.mjs';

export default defineConfig({
  site: config.url,
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: { rehypePlugins: [rehypeFigure] },
});
