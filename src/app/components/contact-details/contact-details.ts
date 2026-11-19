import { Component, computed, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { CompanyContent } from '../../models/content.model';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { toPhoneHref } from '../../utils/contact.util';
import { ProtectedEmail } from '../protected-email/protected-email';

interface DetailRow {
  icon: string;
  labelKey: string;
  value: string;
  href?: string;
  /** Encoded e-mail rendered through `ProtectedEmail` instead of `value`. */
  encodedEmail?: string;
}

/**
 * Company identification and contact details.
 *
 * @input company - Source of the details.
 */
@Component({
  selector: 'app-contact-details',
  imports: [Icon, TranslatePipe, ProtectedEmail],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})
export class ContactDetails {
  readonly company = input.required<CompanyContent>();

  protected readonly rows = computed<DetailRow[]>(() => {
    const company = this.company();
    return [
      { icon: 'building', labelKey: 'contact.details.company', value: company.name },
      { icon: 'location', labelKey: 'contact.details.address', value: company.address },
      { icon: 'id-card', labelKey: 'contact.details.ico', value: company.ico },
      { icon: 'document', labelKey: 'contact.details.dic', value: company.dic },
      { icon: 'bank', labelKey: 'contact.details.bank', value: company.bankAccount },
      { icon: 'mail', labelKey: 'contact.details.email', value: '', encodedEmail: company.email },
      {
        icon: 'phone',
        labelKey: 'contact.details.phone',
        value: company.phone,
        href: toPhoneHref(company.phone),
      },
    ];
  });
}
