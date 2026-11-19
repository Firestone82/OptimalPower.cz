import { Routes } from '@angular/router';
import { languageGuard } from './guards/language.guard';
import { Shell } from './layout/shell/shell';
import { DEFAULT_LANGUAGE } from './models/language.model';

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
    children: [
      { path: '', title: 'nav.home', loadComponent: () => import('./pages/home/home-page') },
      {
        path: 'references',
        title: 'nav.references',
        loadComponent: () => import('./pages/references/references-page'),
      },
      {
        path: 'gallery',
        title: 'nav.gallery',
        loadComponent: () => import('./pages/gallery/gallery-page'),
      },
      { path: 'faq', title: 'nav.faq', loadComponent: () => import('./pages/faq/faq-page') },
      {
        path: 'contact',
        title: 'nav.contact',
        loadComponent: () => import('./pages/contact/contact-page'),
      },
      {
        path: 'privacy',
        title: 'nav.privacy',
        loadComponent: () => import('./pages/privacy/privacy-page'),
      },
      {
        path: 'terms',
        title: 'nav.terms',
        loadComponent: () => import('./pages/terms/terms-page'),
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
