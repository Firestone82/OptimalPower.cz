import { Component, computed, input } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { APP_ICONS, AppIconName } from '../../app.icons';

/**
 * Hugeicons icon resolved by name, so icons can be referenced from JSON content.
 * Decorative by default (`aria-hidden`).
 *
 * @input name - Key of `APP_ICONS`; unknown names render nothing.
 * @input size - Size in px.
 */
@Component({
  selector: 'app-icon',
  imports: [HugeiconsIconComponent],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  host: { 'aria-hidden': 'true' },
})
export class Icon {
  readonly name = input.required<AppIconName | string>();
  readonly size = input(20);

  protected readonly icon = computed(() => APP_ICONS[this.name() as AppIconName]);
}
