import { Component, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

/**
 * Hamburger button for the mobile menu.
 *
 * @input open - Whether the controlled menu is expanded.
 * @output toggled - Emits on every click.
 */
@Component({
  selector: 'app-menu-toggle',
  imports: [NgIcon, TranslatePipe],
  templateUrl: './menu-toggle.html',
  styleUrl: './menu-toggle.scss',
})
export class MenuToggle {
  readonly open = input(false);
  readonly toggled = output<void>();
}
