// Usage: node scripts/rewrite-redirects.mjs <build output dir, e.g. dist/optimalpower-web/browser>
// Angular prerenders redirect routes (`/`, old PHP paths) as pages that briefly show
// "Redirecting to …". This replaces them with blank pages that redirect before the first paint,
// straight to the trailing slash URL GitHub Pages serves, so there is no second redirect.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [dir] = process.argv.slice(2);
if (!dir) {
  console.error('Missing build output directory.');
  process.exit(1);
}

const { siteUrl } = JSON.parse(readFileSync(join(dir, 'content/seo.json'), 'utf8'));
let count = 0;

for (const file of readdirSync(dir, { recursive: true })) {
  if (!file.endsWith('index.html')) continue;
  const path = join(dir, file);
  const target = readFileSync(path, 'utf8').match(
    /<meta http-equiv="refresh" content="0; url=([^"]+)">/,
  )?.[1];
  if (!target) continue;

  const url = target.endsWith('/') ? target : `${target}/`;
  writeFileSync(
    path,
    `<!doctype html>
<html lang="cs">
  <head>
    <meta charset="utf-8" />
    <title>Optimal Power</title>
    <link rel="canonical" href="${siteUrl}${url}" />
    <meta http-equiv="refresh" content="0; url=${url}" />
    <script>location.replace(${JSON.stringify(url)} + location.search + location.hash);</script>
  </head>
  <body></body>
</html>
`,
  );
  count++;
}

console.log(`Rewrote ${count} redirect pages.`);
