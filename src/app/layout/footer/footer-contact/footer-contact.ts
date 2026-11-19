import { Component, input } from '@angular/core';
import { Icon } from '../../../components/icon/icon';
import { CompanyContent } from '../../../models/content.model';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { toPhoneHref } from '../../../utils/contact.util';
import { ProtectedEmail } from '../../../components/protected-email/protected-email';

/**
 * Address, e-mail and phone column.
 *
 * @input company - Source of the contact details.
 */
@Component({
  selector: 'app-footer-contact',
  imports: [Icon, TranslatePipe, ProtectedEmail],
  templateUrl: './footer-contact.html',
  styleUrl: './footer-contact.scss',
})
export class FooterContact {
  readonly company = input.required<CompanyContent>();

  protected readonly toPhoneHref = toPhoneHref;
}
