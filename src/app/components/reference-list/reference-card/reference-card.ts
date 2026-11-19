import { Component, input, output } from '@angular/core';
import { ReferenceContent } from '../../../models/content.model';
import { LocalizePipe } from '../../../pipes/localize.pipe';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { ReferenceSpecs } from './reference-specs/reference-specs';

/**
 * Card of one installation: main photo, thumbnails and technical specs.
 *
 * @input reference - Installation to show.
 * @output imageOpened - Index of the clicked photo within `reference.images`.
 */
@Component({
  selector: 'app-reference-card',
  imports: [ReferenceSpecs, LocalizePipe, TranslatePipe],
  templateUrl: './reference-card.html',
  styleUrl: './reference-card.scss',
})
export class ReferenceCard {
  readonly reference = input.required<ReferenceContent>();
  readonly imageOpened = output<number>();
}
