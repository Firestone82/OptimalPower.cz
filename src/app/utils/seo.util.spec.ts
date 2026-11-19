import { CompanyContent, SeoContent } from '../models/content.model';
import { buildBusinessSchema, buildFaqSchema, canonicalPath } from './seo.util';

describe('canonicalPath', () => {
  it('drops query and fragment and adds a trailing slash', () => {
    expect(canonicalPath('/cs/faq?x=1#top')).toBe('/cs/faq/');
    expect(canonicalPath('/en')).toBe('/en/');
    expect(canonicalPath('/en/')).toBe('/en/');
  });
});

describe('buildBusinessSchema', () => {
  const company = {
    name: 'Optimal Power s.r.o.',
    logo: 'images/logo.svg',
    phone: '+420 606 734 911',
    ico: '1',
    dic: 'CZ1',
    foundedYear: 2020,
  } as CompanyContent;
  const seo = {
    siteUrl: 'https://example.cz',
    image: { src: 'images/og.jpg', alt: '' },
    business: {
      type: 'LocalBusiness',
      description: { cs: 'Popis', en: 'Description' },
      streetAddress: 'Školní 332',
      postalCode: '749 01',
      addressLocality: 'Vítkov',
      addressCountry: 'CZ',
      areaServed: ['Moravskoslezský kraj'],
      sameAs: [],
    },
  } as unknown as SeoContent;

  it('builds absolute urls and a localized description', () => {
    const schema = buildBusinessSchema(company, seo, 'en');
    expect(schema['url']).toBe('https://example.cz/en/');
    expect(schema['logo']).toBe('https://example.cz/images/logo.svg');
    expect(schema['telephone']).toBe('+420606734911');
    expect(schema['description']).toBe('Description');
    expect(schema).not.toHaveProperty('sameAs');
  });
});

describe('buildFaqSchema', () => {
  it('joins paragraphs and bullets into the answer', () => {
    const schema = buildFaqSchema(
      [{ question: { cs: 'Otázka?' }, paragraphs: [{ cs: 'Ano.' }], bullets: ['Bod'] }],
      'cs',
    );
    expect(schema['mainEntity']).toEqual([
      {
        '@type': 'Question',
        name: 'Otázka?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ano.\nBod' },
      },
    ]);
  });
});
