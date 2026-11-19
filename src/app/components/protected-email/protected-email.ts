import { Component, computed, input, signal } from '@angular/core';
import { decodeEmail } from '../../utils/email.util';
import { toMailHref } from '../../utils/contact.util';

/**
 * Renders an encoded e-mail as a link. The address is split around a hidden decoy
 * in the DOM and `href` is only set once the visitor hovers or focuses the link.
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
  protected readonly href = signal<string | null>(null);

  protected reveal(): void {
    this.href.set(toMailHref(this.email()));
  }
}
