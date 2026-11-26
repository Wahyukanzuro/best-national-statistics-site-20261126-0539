// main.ts — The Union Ledger's entrypoint (Node 22, standard library only).
// It copies app/ and screenshots/ from this repository into the output
// directory (MAKEFUN_OUTPUT_DIR outside the grader, /output inside it) and
// writes /output/dossier.json with buildDossier from vendor/makefun-frontend.ts.
// It runs twice and writes the same bytes both times: the copy is a plain
// recursive copy in a fixed order, and the dossier is canonical JSON.

import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const REPO_ROOT = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function copyTree(name: string): void {
  const from = join(REPO_ROOT, name);
  const to = join(OUTPUT_DIR, name);
  cpSync(from, to, { recursive: true, dereference: false });
  console.log(`copied ${name}/ -> ${to}`);
}

function main(): void {
  // Start from an empty output directory so a second run writes exactly
  // what the first run wrote, byte for byte.
  rmSync(OUTPUT_DIR, { recursive: true, force: true });
  mkdirSync(OUTPUT_DIR, { recursive: true });
  copyTree('app');
  copyTree('screenshots');
  const dossier = buildDossier(OUTPUT_DIR, DOSSIER_CAPS);
  writeFileSync(join(OUTPUT_DIR, 'dossier.json'), dossier);
  console.log(`wrote dossier.json (${dossier.length} bytes)`);
}

main();
