import { RenderMode, ServerRoute } from '@angular/ssr';
import { PAGE_ROUTES } from './app.routes';
import { SUPPORTED_LANGUAGES } from './models/language.model';

const everyLanguage = async () => SUPPORTED_LANGUAGES.map((lang) => ({ lang }));

/**
 * Every page is prerendered to static HTML in each language at build time, so crawlers and
 * the first paint get real content on GitHub Pages. Unknown paths fall back to the client
 * rendered shell, which CI publishes as `404.html`.
 */
export const serverRoutes: ServerRoute[] = [
  ...PAGE_ROUTES.filter(({ path }) => path !== '**').map(({ path }): ServerRoute => ({
    path: path ? `:lang/${path}` : ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: everyLanguage,
  })),
  { path: ':lang/**', renderMode: RenderMode.Client },
  // Redirects (`/`, old PHP paths) become small pages that forward to the new URL.
  { path: '**', renderMode: RenderMode.Prerender },
];
