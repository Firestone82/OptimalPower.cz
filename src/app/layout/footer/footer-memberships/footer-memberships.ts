import { Component, input } from '@angular/core';
import { FooterContent } from '../../../models/content.model';
import { LocalizePipe } from '../../../pipes/localize.pipe';
import { TranslatePipe } from '../../../pipes/translate.pipe';

/**
 * Logos of associations the company is a member of.
 *
 * @input memberships - Logo, name and website of each association.
 */
@Component({
  selector: 'app-footer-memberships',
  imports: [LocalizePipe, TranslatePipe],
  templateUrl: './footer-memberships.html',
  styleUrl: './footer-memberships.scss',
})
export class FooterMemberships {
  readonly memberships = input.required<FooterContent['memberships']>();
}
