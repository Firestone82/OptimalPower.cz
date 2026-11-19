import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../models/language.model';
import { replaceUrlLanguage } from '../utils/language.util';
import { Schema, buildBusinessSchema, canonicalPath } from '../utils/seo.util';
import { ContentService } from './content.service';
import { I18nService } from './i18n.service';

/** The page the router has just shown. */
export interface SeoPage {
  /** Router URL, e.g. `/cs/faq`. */
  url: string;
  /** Translation key of the fallback title, from the route's `title`. */
  titleKey?: string;
  /** Entry in `seo.json` `pages`; without it the page is marked `noindex`. */
  seoKey?: string;
}

/** Marks head elements owned by this service, so they can be replaced on navigation. */
const MANAGED = 'data-seo';

/**
 * Keeps the document head in sync with the current page and language: title, description,
 * canonical and hreflang links, Open Graph and Twitter tags and JSON-LD structured data.
 * Runs during prerendering too, so the static HTML carries the same tags.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(I18nService);
  private readonly content = inject(ContentService);
  private readonly seo = toSignal(this.content.load('seo'));
  private readonly company = toSignal(this.content.load('company'));
  private readonly page = signal<SeoPage | null>(null);
  private readonly pageSchema = signal<Schema | null>(null);

  constructor() {
    effect(() => this.apply());
  }

  setPage(page: SeoPage): void {
    this.page.set(page);
  }

  /** Extra structured data of the current page, e.g. its FAQ; `null` removes it. */
  setPageSchema(schema: Schema | null): void {
    this.pageSchema.set(schema);
  }

  private apply(): void {
    const page = this.page();
    if (!page) return;

    const seo = this.seo();
    const pageSeo = page.seoKey ? seo?.pages[page.seoKey] : undefined;
    const siteName = this.i18n.translate('site.name');
    const pageTitle = pageSeo
      ? this.i18n.localize(pageSeo.title)
      : page.titleKey && this.i18n.translate(page.titleKey);
    this.title.setTitle(pageTitle ? `${pageTitle} | ${siteName}` : siteName);

    this.resetHead();
    if (!seo || !pageSeo) {
      this.meta.updateTag({ name: 'robots', content: 'noindex' });
      return;
    }
    this.meta.removeTag('name="robots"');

    const language = this.i18n.language();
    const absolute = (path: string) => `${seo.siteUrl}${canonicalPath(path)}`;
    const url = absolute(page.url);
    const description = this.i18n.localize(pageSeo.description);

    this.addLink({ rel: 'canonical', href: url });
    for (const alternate of SUPPORTED_LANGUAGES) {
      const href = absolute(replaceUrlLanguage(page.url, alternate));
      this.addLink({ rel: 'alternate', hreflang: alternate, href });
    }
    const defaultHref = absolute(replaceUrlLanguage(page.url, DEFAULT_LANGUAGE));
    this.addLink({ rel: 'alternate', hreflang: 'x-default', href: defaultHref });

    this.meta.updateTag({ name: 'description', content: description });
    this.addMeta('og:type', 'website');
    this.addMeta('og:site_name', siteName);
    this.addMeta('og:title', pageTitle || siteName);
    this.addMeta('og:description', description);
    this.addMeta('og:url', url);
    this.addMeta('og:image', `${seo.siteUrl}/${seo.image.src}`);
    this.addMeta('og:image:alt', this.i18n.localize(seo.image.alt));
    this.addMeta('og:locale', seo.locales[language]);
    for (const other of SUPPORTED_LANGUAGES.filter((lang) => lang !== language)) {
      this.addMeta('og:locale:alternate', seo.locales[other]);
    }
    this.addMeta('twitter:card', 'summary_large_image', 'name');

    const company = this.company();
    if (company) this.addSchema(buildBusinessSchema(company, seo, language));
    const pageSchema = this.pageSchema();
    if (pageSchema) this.addSchema(pageSchema);
  }

  /** Removes the tags added for the previous page, including ones prerendered into the HTML. */
  private resetHead(): void {
    this.document.head.querySelectorAll(`[${MANAGED}]`).forEach((element) => element.remove());
  }

  private addLink(attributes: Record<string, string>): void {
    const link = this.document.createElement('link');
    Object.entries(attributes).forEach(([name, value]) => link.setAttribute(name, value));
    this.append(link);
  }

  /** Open Graph uses `property`, Twitter uses `name`. */
  private addMeta(key: string, content: string | undefined, attribute = 'property'): void {
    if (!content) return;
    const meta = this.document.createElement('meta');
    meta.setAttribute(attribute, key);
    meta.setAttribute('content', content);
    this.append(meta);
  }

  private addSchema(schema: Schema): void {
    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    // `<` is escaped so text from the content files can never close the script element.
    script.textContent = JSON.stringify(schema).replace(/</g, '\\u003c');
    this.append(script);
  }

  private append(element: HTMLElement): void {
    element.setAttribute(MANAGED, '');
    this.document.head.appendChild(element);
  }
}
