import { Component, computed, inject, input, signal } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { decodeEmail } from '../../utils/email.util';
import { toMailHref } from '../../utils/contact.util';

/**
 * Renders an encoded e-mail as a link. The address is split around a hidden decoy
 * in the DOM and the `mailto:` link is only set once the visitor hovers or focuses it. Until then
 * it points to the contact page, so crawlers still see a normal link.
 *
 * @input encoded - Value produced by `encodeEmail` (see `utils/email.util.ts`).
 */
@Component({
  selector: 'app-protected-email',
  templateUrl: './protected-email.html',
  styleUrl: './protected-email.scss',
})
export class ProtectedEmail {
  readonly encoded = input.required<string>();

  private readonly email = computed(() => decodeEmail(this.encoded()));
  protected readonly parts = computed(() => {
    const [user = '', domain = ''] = this.email().split('@');
    return { user, domain };
  });
  private readonly i18n = inject(I18nService);
  private readonly mailHref = signal<string | null>(null);
  protected readonly href = computed(() => this.mailHref() ?? `/${this.i18n.language()}/contact`);

  protected reveal(): void {
    this.mailHref.set(toMailHref(this.email()));
  }
}
