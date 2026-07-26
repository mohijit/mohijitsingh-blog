import { visit } from 'unist-util-visit';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import path from 'node:path';

const execFileAsync = promisify(execFile);
const CACHE_DIR = path.resolve('.tikz-cache');

const TECTONIC = process.env.TECTONIC_BIN || 'tectonic';
const PDFTOCAIRO = process.env.PDFTOCAIRO_BIN || 'pdftocairo';

const PREAMBLE = String.raw`\documentclass[tikz,border=2pt]{standalone}
\usepackage{amssymb}
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}
\usetikzlibrary{arrows.meta,positioning,calc,shapes,decorations.pathreplacing}
\begin{document}
\begin{tikzpicture}
`;

const POSTAMBLE = String.raw`
\end{tikzpicture}
\end{document}
`;

async function compileTikz(code) {
  const hash = createHash('sha256').update(code).digest('hex').slice(0, 16);
  const cachedPath = path.join(CACHE_DIR, `${hash}.svg`);
  if (existsSync(cachedPath)) {
    return readFile(cachedPath, 'utf8');
  }

  const workDir = await mkdtemp(path.join(tmpdir(), 'tikz-'));
  try {
    const texPath = path.join(workDir, 'diagram.tex');
    await writeFile(texPath, PREAMBLE + code + POSTAMBLE, 'utf8');

    await execFileAsync(TECTONIC, ['diagram.tex'], { cwd: workDir });
    await execFileAsync(PDFTOCAIRO, ['-svg', 'diagram.pdf', 'diagram.svg'], { cwd: workDir });

    let svg = await readFile(path.join(workDir, 'diagram.svg'), 'utf8');
    svg = svg.replace(/^<\?xml[^>]*\?>\s*/, '');

    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(cachedPath, svg, 'utf8');
    return svg;
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

export default function remarkTikz() {
  return async (tree) => {
    const nodes = [];
    visit(tree, 'code', (node) => {
      if (node.lang === 'tikz') nodes.push(node);
    });

    for (const node of nodes) {
      try {
        const svg = await compileTikz(node.value);
        node.type = 'html';
        node.value = `<div class="tikz-diagram">${svg}</div>`;
      } catch (err) {
        const message = err?.stderr || err?.message || String(err);
        node.type = 'html';
        node.value = `<pre class="tikz-error">TikZ compilation failed:\n${message}</pre>`;
      }
    }
  };
}
