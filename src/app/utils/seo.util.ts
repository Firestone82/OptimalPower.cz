import { CompanyContent, FaqItemContent, SeoContent } from '../models/content.model';
import { Language } from '../models/language.model';
import { resolveLocalized } from './localize.util';

/** A schema.org object, serialized as JSON-LD. */
export type Schema = Record<string, unknown>;

/**
 * Drops the query and fragment and ends the path with `/`, the form GitHub Pages serves
 * prerendered pages under (`/cs/faq` redirects to `/cs/faq/`).
 */
export function canonicalPath(url: string): string {
  const [path] = url.split(/[?#]/);
  return path.endsWith('/') ? path : `${path}/`;
}

/** Company as a schema.org `LocalBusiness` (or the subtype set in `seo.json`). */
export function buildBusinessSchema(
  company: CompanyContent,
  seo: SeoContent,
  language: Language,
): Schema {
  const { business, siteUrl } = seo;
  return {
    '@context': 'https://schema.org',
    '@type': business.type,
    '@id': `${siteUrl}/#business`,
    name: company.name,
    description: resolveLocalized(business.description, language),
    url: `${siteUrl}/${language}/`,
    logo: `${siteUrl}/${company.logo}`,
    image: `${siteUrl}/${seo.image.src}`,
    telephone: company.phone.replace(/\s/g, ''),
    vatID: company.dic,
    taxID: company.ico,
    foundingDate: String(company.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.streetAddress,
      postalCode: business.postalCode,
      addressLocality: business.addressLocality,
      addressCountry: business.addressCountry,
    },
    areaServed: business.areaServed,
    ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
  };
}

/** Questions and answers as a schema.org `FAQPage`. */
export function buildFaqSchema(items: FaqItemContent[], language: Language): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: resolveLocalized(item.question, language),
      acceptedAnswer: {
        '@type': 'Answer',
        text: [...(item.paragraphs ?? []), ...(item.bullets ?? [])]
          .map((text) => resolveLocalized(text, language))
          .join('\n'),
      },
    })),
  };
}
