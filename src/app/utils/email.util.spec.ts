import { decodeEmail, encodeEmail } from './email.util';

describe('email.util', () => {
  it('round-trips an address without exposing it', () => {
    const encoded = encodeEmail('info@optimalpower.cz');
    expect(encoded).not.toContain('@');
    expect(decodeEmail(encoded)).toBe('info@optimalpower.cz');
  });

  it('returns empty string for invalid input', () => {
    expect(decodeEmail('%%%')).toBe('');
  });
});
