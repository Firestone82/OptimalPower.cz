/**
 * E-mails are stored in content JSON reversed and Base64 encoded, so neither the
 * JSON files nor the initial HTML contain a plain `user@domain` for scrapers.
 * Use `npm run encode-email -- user@domain.cz` to produce a value.
 */
export function encodeEmail(email: string): string {
  return btoa([...email].reverse().join(''));
}

export function decodeEmail(encoded: string): string {
  try {
    return [...atob(encoded)].reverse().join('');
  } catch {
    return '';
  }
}
