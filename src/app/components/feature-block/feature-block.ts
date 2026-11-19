import { Component, input } from '@angular/core';
import { FeatureContent } from '../../models/content.model';
import { LocalizePipe } from '../../pipes/localize.pipe';
import { OfferList } from './offer-list/offer-list';

/**
 * Two column block with text on one side and an image on the other.
 *
 * @input feature - Title, paragraphs, optional offer list and links, image.
 * @input reversed - Puts the image on the left on wide screens.
 * @input headingLevel - `1` when the block is the page's main heading.
 */
@Component({
  selector: 'app-feature-block',
  imports: [LocalizePipe, OfferList],
  templateUrl: './feature-block.html',
  styleUrl: './feature-block.scss',
  host: { '[class.reversed]': 'reversed()' },
})
export class FeatureBlock {
  readonly feature = input.required<FeatureContent>();
  readonly reversed = input(false);
  readonly headingLevel = input<1 | 2>(2);
}
