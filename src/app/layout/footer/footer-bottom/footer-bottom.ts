import { Component, inject, input } from '@angular/core';
import { Icon } from '../../../components/icon/icon';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { ConsentService } from '../../../services/consent.service';

/**
 * Copyright line, plus a link to reopen the cookie choice when analytics is on.
 *
 * @input companyName - Copyright holder.
 * @input foundedYear - First year of the copyright range.
 */
@Component({
  selector: 'app-footer-bottom',
  imports: [Icon, TranslatePipe],
  templateUrl: './footer-bottom.html',
  styleUrl: './footer-bottom.scss',
})
export class FooterBottom {
  readonly companyName = input.required<string>();
  readonly foundedYear = input.required<number>();

  protected readonly consent = inject(ConsentService);
  protected readonly currentYear = new Date().getFullYear();
}
