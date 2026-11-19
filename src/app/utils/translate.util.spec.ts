import { translate } from './translate.util';
import { resolveLocalized } from './localize.util';

describe('translate', () => {
  const dictionary = { nav: { home: 'Domů' }, footer: { copyright: '© {{name}} {{year}}' } };

  it('resolves nested keys', () => {
    expect(translate(dictionary, 'nav.home')).toBe('Domů');
  });

  it('returns the key when missing', () => {
    expect(translate(dictionary, 'nav.missing')).toBe('nav.missing');
  });

  it('interpolates params', () => {
    expect(translate(dictionary, 'footer.copyright', { name: 'OP', year: 2026 })).toBe('© OP 2026');
  });
});

describe('resolveLocalized', () => {
  it('falls back to the default language', () => {
    expect(resolveLocalized({ cs: 'Ahoj' }, 'en')).toBe('Ahoj');
    expect(resolveLocalized({ cs: 'Ahoj', en: 'Hi' }, 'en')).toBe('Hi');
    expect(resolveLocalized('Neutral', 'en')).toBe('Neutral');
  });
});
