import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CompanyContent } from '../../../models/content.model';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { toMailHref, toPhoneHref } from '../../../utils/contact.util';

/**
 * Address, e-mail and phone column.
 *
 * @input company - Source of the contact details.
 */
@Component({
  selector: 'app-footer-contact',
  imports: [NgIcon, TranslatePipe],
  templateUrl: './footer-contact.html',
  styleUrl: './footer-contact.scss',
})
export class FooterContact {
  readonly company = input.required<CompanyContent>();

  protected readonly toMailHref = toMailHref;
  protected readonly toPhoneHref = toPhoneHref;
}
