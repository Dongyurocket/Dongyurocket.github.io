import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const site =
  process.env.SITE_URL ??
  (process.env.GITHUB_REPOSITORY_OWNER
    ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
    : 'http://127.0.0.1:4321');

export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
