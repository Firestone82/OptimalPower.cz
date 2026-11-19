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

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: DEFAULT_LANGUAGE },
  ...LEGACY_REDIRECTS,
  {
    path: ':lang',
    canMatch: [languageGuard],
    component: Shell,
    resolve: { content: contentResolver('company', 'navigation', 'footer') },
    children: [
      {
        path: '',
        title: 'nav.home',
        loadComponent: () => import('./pages/home/home-page'),
        resolve: { content: contentResolver('home') },
      },
      {
        path: 'references',
        title: 'nav.references',
        loadComponent: () => import('./pages/references/references-page'),
        resolve: { content: contentResolver('references') },
      },
      {
        path: 'gallery',
        title: 'nav.gallery',
        loadComponent: () => import('./pages/gallery/gallery-page'),
        resolve: { content: contentResolver('gallery') },
      },
      {
        path: 'faq',
        title: 'nav.faq',
        loadComponent: () => import('./pages/faq/faq-page'),
        resolve: { content: contentResolver('faq') },
      },
      {
        path: 'contact',
        title: 'nav.contact',
        loadComponent: () => import('./pages/contact/contact-page'),
        resolve: { content: contentResolver('contact') },
      },
      {
        path: 'privacy',
        title: 'nav.privacy',
        loadComponent: () => import('./pages/privacy/privacy-page'),
        resolve: { content: contentResolver('privacy') },
      },
      {
        path: 'terms',
        title: 'nav.terms',
        loadComponent: () => import('./pages/terms/terms-page'),
        resolve: { content: contentResolver('terms') },
      },
      {
        path: '**',
        title: 'notFound.title',
        loadComponent: () => import('./pages/not-found/not-found-page'),
      },
    ],
  },
  { path: '**', redirectTo: `${DEFAULT_LANGUAGE}/not-found` },
];
