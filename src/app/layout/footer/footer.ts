import { Component, input } from '@angular/core';
import { CompanyContent, FooterContent } from '../../models/content.model';
import { FooterBottom } from './footer-bottom/footer-bottom';
import { FooterBrand } from './footer-brand/footer-brand';
import { FooterContact } from './footer-contact/footer-contact';
import { FooterLinks } from './footer-links/footer-links';
import { FooterMemberships } from './footer-memberships/footer-memberships';

/**
 * Site footer.
 *
 * @input company - Company details shown in the brand and contact columns.
 * @input content - Footer links and membership logos.
 */
@Component({
  selector: 'app-footer',
  imports: [FooterBrand, FooterContact, FooterLinks, FooterMemberships, FooterBottom],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly company = input.required<CompanyContent>();
  readonly content = input.required<FooterContent>();
}
