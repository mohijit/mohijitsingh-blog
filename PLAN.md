# mohijitsingh-blog — architecture & authoring guide

## Context

Personal blog at `blog.mohijitsingh.com`, covering mathematics, computer science,
and AI. Linked from the [mohijitsingh.com](https://mohijitsingh.com) portfolio
hub, alongside `trade.` (Vol-Trade) and `chess.` (Checksmith), reusing the same
one-repo-per-subdomain pattern.

Unlike the hub and Checksmith's site (both hand-rolled static HTML, shipped once
and rarely touched), a blog is a recurring content workflow — new posts get
added routinely — so it uses a real static site generator instead of hand-copied
page shells.

## Stack

**Astro**, plain Markdown content collections, LaTeX via `remark-math` +
`rehype-katex`, deployed with GitHub Actions to GitHub Pages.

**Why Astro over Jekyll** (GitHub Pages' native, zero-CI generator): Jekyll's
LaTeX story is client-side — kramdown wraps `$…$`/`$$…$$` in
`<script type="math/tex">`, and MathJax renders it in the browser at page load
(a visible flash-of-unrendered-math, plus a real runtime JS dependency). Astro
renders LaTeX to static HTML **at build time**, so formulas are just part of
the page — no client JS, no flash. Astro also gives typed content-collection
frontmatter, free Shiki syntax highlighting for code blocks, and built-in RSS.
The cost is one added piece of infra (a GitHub Actions workflow, since GitHub's
native Pages builder only understands Jekyll) — acceptable since the whole
thing can be built and verified locally before every push.

**A non-obvious version gotcha, for whoever touches this next:** Astro 7
shipped a new default Markdown processor ("Sätteri") and made the old
remark/rehype pipeline opt-in. `remark-math`/`rehype-katex` need the legacy
pipeline, so `astro.config.mjs` explicitly sets:

```js
import { unified } from '@astrojs/markdown-remark'; // separate package, not bundled by default anymore
markdown: {
  processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
}
```

(The older top-level `markdown.remarkPlugins`/`rehypePlugins` keys still work
but are deprecated and print a warning — don't use them if editing this later.)

## Structure

- `src/content.config.ts` — `blog` collection, `glob` loader over
  `src/content/blog/**/*.md`, zod schema: `title`, `description`, `date`,
  `tags`, `draft`.
- `src/layouts/Layout.astro` — shared page shell. Reuses the **exact CSS custom
  properties** from `mohijitsingh-hub/index.html` (`--bg`/`--surface`/
  `--border`/`--text`/`--accent`, light+dark via `prefers-color-scheme`) so the
  blog reads as the same family as the hub and other subdomains. Imports
  `katex/dist/katex.min.css`; Vite bundles KaTeX's fonts automatically — no
  CDN dependency.
- `src/pages/index.astro` — post list (newest first; drafts hidden in
  production builds via `import.meta.env.PROD`).
- `src/pages/blog/[...slug].astro` — post page, renders each entry's `Content`.
- `src/pages/rss.xml.js` — RSS feed via `@astrojs/rss` (drafts always excluded).
- `.github/workflows/deploy.yml` — build + `actions/upload-pages-artifact` +
  `actions/deploy-pages` on push to `master`.
- `public/CNAME` — `blog.mohijitsingh.com` (copied into `dist/` root by Astro).

## Writing a post

1. Add `src/content/blog/<slug>.md` with frontmatter:
   ```yaml
   ---
   title: "..."
   description: "..."
   date: 2026-07-18
   tags: ["math"]
   draft: false   # optional, defaults to false; set true to hide from prod
   ---
   ```
2. Inline math: `$a^2 + b^2 = c^2$`. Display math: `$$ ... $$`. Standard KaTeX
   LaTeX syntax (not full LaTeX — no arbitrary packages).
3. Fenced code blocks (```` ```python ````) get Shiki syntax highlighting for
   free.
4. Preview locally: `npm run dev`.
5. `git push` — GitHub Actions builds and deploys automatically (~1-2 min).

## Verification performed

- `npm run build` succeeds; inspected `dist/blog/hello-world/index.html`
  directly and confirmed real `<math>`/KaTeX markup for all three sample
  expressions (inline symbol, inline equation, display block) with zero raw
  `$…$` left in the output, Shiki `astro-code` highlighting present on the code
  block, and `dist/CNAME` correctly containing `blog.mohijitsingh.com`.
- KaTeX fonts confirmed bundled into `dist/_astro/*.woff2` (self-hosted, no
  CDN).
- No real browser was available in this environment — verification was at the
  build-output/HTML level, not a visual check. Worth a manual look once live.
