import { Component, input } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

/**
 * Copyright and author line.
 *
 * @input companyName - Copyright holder.
 * @input foundedYear - First year of the copyright range.
 * @input author - Website author credit.
 */
@Component({
  selector: 'app-footer-bottom',
  imports: [TranslatePipe],
  templateUrl: './footer-bottom.html',
  styleUrl: './footer-bottom.scss',
})
export class FooterBottom {
  readonly companyName = input.required<string>();
  readonly foundedYear = input.required<number>();
  readonly author = input('');

  protected readonly currentYear = new Date().getFullYear();
}
