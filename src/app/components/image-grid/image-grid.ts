import { Component, input, output } from '@angular/core';
import { ImageRef } from '../../models/content.model';
import { LocalizePipe } from '../../pipes/localize.pipe';

/**
 * Responsive grid of image thumbnails.
 *
 * @input images - Images to render.
 * @output opened - Index of the clicked image.
 */
@Component({
  selector: 'app-image-grid',
  imports: [LocalizePipe],
  templateUrl: './image-grid.html',
  styleUrl: './image-grid.scss',
})
export class ImageGrid {
  readonly images = input.required<ImageRef[]>();
  readonly opened = output<number>();
}
