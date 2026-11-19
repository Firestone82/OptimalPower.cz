import { Component, input } from '@angular/core';

/**
 * Indeterminate bar pinned to the top of the viewport.
 *
 * @input active - Shows the bar while `true`.
 */
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
  host: { '[class.active]': 'active()' },
})
export class ProgressBar {
  readonly active = input(false);
}
