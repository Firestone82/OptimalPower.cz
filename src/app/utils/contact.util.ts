export function toPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function toMailHref(email: string, subject?: string, body?: string): string {
  const query = new URLSearchParams();
  if (subject) query.set('subject', subject);
  if (body) query.set('body', body);

  const search = query.toString().replace(/\+/g, '%20');
  return `mailto:${email}${search ? `?${search}` : ''}`;
}
