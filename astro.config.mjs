// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkTikz from './plugins/remark-tikz.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.mohijitsingh.com',
  integrations: [sitemap(), mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkTikz],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
