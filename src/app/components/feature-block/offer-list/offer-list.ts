import { Component, input } from '@angular/core';
import { OfferItem } from '../../../models/content.model';
import { LocalizePipe } from '../../../pipes/localize.pipe';

/**
 * Numbered list of services with optional lettered sub items.
 *
 * @input items - Top level services and their sub items.
 */
@Component({
  selector: 'app-offer-list',
  imports: [LocalizePipe],
  templateUrl: './offer-list.html',
  styleUrl: './offer-list.scss',
})
export class OfferList {
  readonly items = input.required<OfferItem[]>();
}
