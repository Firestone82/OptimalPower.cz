import { Component, input } from '@angular/core';
import { LocalizedText } from '../../../models/language.model';
import { LocalizePipe } from '../../../pipes/localize.pipe';

/**
 * Logo with the company motto.
 *
 * @input logo - URL of the logo image.
 * @input companyName - Logo alt text.
 * @input motto - Quote shown below the logo.
 */
@Component({
  selector: 'app-footer-brand',
  imports: [LocalizePipe],
  templateUrl: './footer-brand.html',
  styleUrl: './footer-brand.scss',
})
export class FooterBrand {
  readonly logo = input.required<string>();
  readonly companyName = input.required<string>();
  readonly motto = input<LocalizedText>('');
}
