import { Component, input, output } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { ImageRef } from '../../models/content.model';
import { LocalizePipe } from '../../pipes/localize.pipe';
import { LazyImage } from './lazy-image/lazy-image';

/**
 * Responsive grid of image thumbnails, loaded lazily as they scroll into view.
 *
 * @input images - Images to render.
 * @output opened - Index of the clicked image.
 */
@Component({
  selector: 'app-image-grid',
  imports: [LazyImage, LocalizePipe, RevealDirective],
  templateUrl: './image-grid.html',
  styleUrl: './image-grid.scss',
})
export class ImageGrid {
  readonly images = input.required<ImageRef[]>();
  readonly opened = output<number>();
}
