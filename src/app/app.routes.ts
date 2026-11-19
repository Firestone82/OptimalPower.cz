import { Routes } from '@angular/router';
import { languageGuard } from './guards/language.guard';
import { Shell } from './layout/shell/shell';
import { DEFAULT_LANGUAGE } from './models/language.model';
import { contentResolver } from './resolvers/content.resolver';

/** Paths of the previous PHP site, kept so existing links and search results still work. */
const LEGACY_REDIRECTS: Routes = [
  { path: 'realizace', redirectTo: 'cs/references' },
  { path: 'reference', redirectTo: 'cs/references' },
  { path: 'fotogalerie', redirectTo: 'cs/gallery' },
  { path: 'faq', redirectTo: 'cs/faq' },
  { path: 'kontakt', redirectTo: 'cs/contact' },
  { path: 'gdpr', redirectTo: 'cs/privacy' },
];

/**
 * Pages under the language prefix. `data.seo` names the entry in `content/seo.json` with the
 * page's search title and description; a page without it is kept out of search results.
 * `data.content` lists the content files the page needs, see `contentResolver`.
 */
export const PAGE_ROUTES: Routes = [
  {
    path: '',
    title: 'nav.home',
    data: { seo: 'home', content: ['home'] },
    loadComponent: () => import('./pages/home/home-page'),
    resolve: { content: contentResolver },
  },
  {
    path: 'references',
    title: 'nav.references',
    data: { seo: 'references', content: ['references'] },
    loadComponent: () => import('./pages/references/references-page'),
    resolve: { content: contentResolver },
  },
  {
    path: 'gallery',
    title: 'nav.gallery',
    data: { seo: 'gallery', content: ['gallery'] },
    loadComponent: () => import('./pages/gallery/gallery-page'),
    resolve: { content: contentResolver },
  },
  {
    path: 'faq',
    title: 'nav.faq',
    data: { seo: 'faq', content: ['faq'] },
    loadComponent: () => import('./pages/faq/faq-page'),
    resolve: { content: contentResolver },
  },
  {
    path: 'contact',
    title: 'nav.contact',
    data: { seo: 'contact', content: ['contact'] },
    loadComponent: () => import('./pages/contact/contact-page'),
    resolve: { content: contentResolver },
  },
  {
    path: 'privacy',
    title: 'nav.privacy',
    data: { seo: 'privacy', content: ['privacy'] },
    loadComponent: () => import('./pages/privacy/privacy-page'),
    resolve: { content: contentResolver },
  },
  {
    path: 'terms',
    title: 'nav.terms',
    data: { seo: 'terms', content: ['terms'] },
    loadComponent: () => import('./pages/terms/terms-page'),
    resolve: { content: contentResolver },
  },
  {
    path: '**',
    title: 'notFound.title',
    loadComponent: () => import('./pages/not-found/not-found-page'),
  },
];

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: DEFAULT_LANGUAGE },
  ...LEGACY_REDIRECTS,
  {
    path: ':lang',
    canMatch: [languageGuard],
    component: Shell,
    data: { content: ['company', 'navigation', 'footer', 'seo'] },
    resolve: { content: contentResolver },
    children: PAGE_ROUTES,
  },
  { path: '**', redirectTo: `${DEFAULT_LANGUAGE}/not-found` },
];
