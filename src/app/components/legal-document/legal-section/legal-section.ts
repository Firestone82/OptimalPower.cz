import { Component, input } from '@angular/core';
import { CompanyContent, LegalSectionContent } from '../../../models/content.model';
import { LocalizePipe } from '../../../pipes/localize.pipe';
import { ContactDetails } from '../../contact-details/contact-details';

/**
 * One numbered section of a legal document.
 *
 * @input section - Heading, paragraphs and list items of the section.
 * @input number - Position shown before the heading, starting at 1.
 * @input company - Rendered as contact details when the section sets `showCompany`.
 */
@Component({
  selector: 'app-legal-section',
  imports: [ContactDetails, LocalizePipe],
  templateUrl: './legal-section.html',
  styleUrl: './legal-section.scss',
  host: { '[id]': 'section().id' },
})
export class LegalSection {
  readonly section = input.required<LegalSectionContent>();
  readonly number = input.required<number>();
  readonly company = input<CompanyContent>();
}
