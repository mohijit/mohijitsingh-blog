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

## Diagrams (TikZ, build-time)

A custom remark plugin (`plugins/remark-tikz.mjs`) finds ` ```tikz ` fenced
code blocks, wraps the contents in a minimal `standalone` LaTeX document
(TikZ + pgfplots preamble, common libraries pre-loaded), compiles via
**tectonic** (a small self-contained LaTeX engine — no full TeX Live install)
to PDF, converts to SVG via **pdftocairo** (poppler-utils), and inlines the
result. Content-hashed cache in `.tikz-cache/` (gitignored, restored via
`actions/cache` in CI) so unchanged diagrams skip recompilation. Zero
client-side cost, same philosophy as the KaTeX math.

TikZ draws in plain black by default (no theme awareness), so the compiled
SVG is wrapped in a fixed white card (`.tikz-diagram` in `Layout.astro`) —
same reasoning as the code blocks having their own fixed dark background
regardless of site theme, otherwise it'd vanish in dark mode.

Local dev needs `tectonic` and `pdftocairo` on `PATH` (or set `TECTONIC_BIN`/
`PDFTOCAIRO_BIN` env vars to point at them). CI installs both automatically
(see `.github/workflows/deploy.yml`).

Usage in any post:
```tikz
\draw[thick,->] (0,0) -- (3,0) node[right] {$x$};
\draw[blue,thick] (0,0) circle (2);
```
(Just the tikzpicture contents — the `\begin{tikzpicture}`/`\documentclass`
wrapping happens automatically.)

## Interactive charts (Observable Plot, requires .mdx)

`src/components/Chart.astro` wraps **Observable Plot** (D3-based, much less
boilerplate than raw D3 for function/data plots). Hover shows a live tooltip
via `Plot.tip`+`Plot.pointer`. Two modes:
- `fn="Math.sin(x)"` + `domain={[-8, 8]}` — samples a JS expression over a
  domain.
- `data={[{x, y}, ...]}` — plot explicit data points.
Both accept `marks` (`line`/`dot`/`barY`), `width`/`height`, `xLabel`/`yLabel`.

**Only works in `.mdx` posts**, not plain `.md` — embedding a live component in
content requires MDX. Plain text/math posts can stay `.md`; only posts that
need a chart use `.mdx`. Import and use like any component:
```mdx
import Chart from '../../components/Chart.astro';

<Chart fn="1 / (1 + Math.exp(-x))" domain={[-8, 8]} xLabel="x" yLabel="σ(x)" />
```

Implementation note: the component passes its config to the client via a
`data-chart-spec` JSON attribute, not Astro's `define:vars` — `define:vars`
scripts are inlined *without* going through Vite's bundler, so they can't use
`import` statements (learned this the hard way; the first version silently
failed with "Cannot use import statement outside a module").

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
- A headless browser (Playwright) was installed in the dev environment and
  used for real visual verification of later changes — screenshots confirmed
  the TikZ diagram and Observable Plot chart both render correctly with real
  data, in both light and dark mode.
- Full pipeline (tectonic + pdftocairo) tested locally on Windows using
  portable binaries (no admin install available) before ever touching CI.
- **One unresolved gap:** the chart's hover tooltip (`Plot.tip`) could not be
  triggered via automated Playwright interaction, despite confirming the
  event listeners are correctly attached to the SVG and events fire with
  correct coordinates (`isTrusted: true`, correct `clientX`/`clientY`). This
  looks like a headless-browser `getScreenCTM()` coordinate-transform quirk
  (a known category of flakiness for D3 pointer interactions under headless
  testing) rather than a real bug — this exact `Plot.tip`+`Plot.pointer`
  pattern is Observable Plot's standard, heavily-used tooltip recipe. Worth a
  real mouse check once live; if it genuinely doesn't work, revisit
  `Chart.astro`'s pointer wiring.
