import { Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CompanyContent } from '../../models/content.model';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { toMailHref, toPhoneHref } from '../../utils/contact.util';

interface DetailRow {
  icon: string;
  labelKey: string;
  value: string;
  href?: string;
}

/**
 * Company identification and contact details.
 *
 * @input company - Source of the details.
 */
@Component({
  selector: 'app-contact-details',
  imports: [NgIcon, TranslatePipe],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})
export class ContactDetails {
  readonly company = input.required<CompanyContent>();

  protected readonly rows = computed<DetailRow[]>(() => {
    const company = this.company();
    return [
      { icon: 'lucideBuilding2', labelKey: 'contact.details.company', value: company.name },
      { icon: 'lucideMapPin', labelKey: 'contact.details.address', value: company.address },
      { icon: 'lucideIdCard', labelKey: 'contact.details.ico', value: company.ico },
      { icon: 'lucideFileText', labelKey: 'contact.details.dic', value: company.dic },
      { icon: 'lucideLandmark', labelKey: 'contact.details.bank', value: company.bankAccount },
      {
        icon: 'lucideMail',
        labelKey: 'contact.details.email',
        value: company.email,
        href: toMailHref(company.email),
      },
      {
        icon: 'lucidePhone',
        labelKey: 'contact.details.phone',
        value: company.phone,
        href: toPhoneHref(company.phone),
      },
    ];
  });
}
