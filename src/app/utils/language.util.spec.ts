import { detectBrowserLanguage, isLanguage, replaceUrlLanguage } from './language.util';

describe('language.util', () => {
  it('validates supported languages', () => {
    expect(isLanguage('cs')).toBe(true);
    expect(isLanguage('de')).toBe(false);
  });

  it('detects the first supported browser language', () => {
    expect(detectBrowserLanguage(['de-DE', 'en-GB', 'cs'])).toBe('en');
    expect(detectBrowserLanguage(['de-DE'])).toBe('cs');
  });

  it('replaces the language segment of a url', () => {
    expect(replaceUrlLanguage('/cs/references?year=2021#top', 'en')).toBe(
      '/en/references?year=2021#top',
    );
    expect(replaceUrlLanguage('/cs', 'en')).toBe('/en');
  });
});
