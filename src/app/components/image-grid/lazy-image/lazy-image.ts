import { Component, input, linkedSignal } from '@angular/core';

/**
 * Image that is downloaded only when it nears the viewport and fades in over a shimmering
 * placeholder. The parent sizes the host, the image covers it.
 *
 * @input src - Image URL.
 * @input alt - Alternative text.
 */
@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.html',
  styleUrl: './lazy-image.scss',
  host: { '[class.loaded]': 'loaded()' },
})
export class LazyImage {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();

  /** Also set when loading fails, so the placeholder doesn't shimmer forever. */
  protected readonly loaded = linkedSignal({ source: this.src, computation: () => false });
}
