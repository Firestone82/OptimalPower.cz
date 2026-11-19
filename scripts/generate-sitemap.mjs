// Usage: node scripts/generate-sitemap.mjs <build output dir, e.g. dist/optimalpower-web/browser>
// Builds sitemap.xml from the prerendered pages: each page's canonical URL and its hreflang
// alternates are read from its <head>, so the sitemap always matches what SeoService rendered.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [dir] = process.argv.slice(2);
if (!dir) {
  console.error('Missing build output directory.');
  process.exit(1);
}

const pages = readdirSync(dir, { recursive: true })
  .filter((file) => file.endsWith('index.html'))
  .map((file) => readFileSync(join(dir, file), 'utf8'))
  // Redirect pages and pages marked `noindex` (such as the 404 page) stay out.
  .filter((html) => !/http-equiv="refresh"|name="robots" content="noindex"/.test(html))
  .map((html) => ({
    url: html.match(/<link rel="canonical" href="([^"]+)"/)?.[1],
    alternates: [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)],
  }))
  .filter((page) => page.url)
  .sort((a, b) => a.url.localeCompare(b.url));

const entries = pages.map(({ url, alternates }) =>
  [
    '  <url>',
    `    <loc>${url}</loc>`,
    ...alternates.map(
      ([, lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`,
    ),
    '  </url>',
  ].join('\n'),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

writeFileSync(join(dir, 'sitemap.xml'), sitemap);
console.log(`Wrote sitemap.xml with ${pages.length} pages.`);
