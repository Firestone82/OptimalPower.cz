import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../../../components/icon/icon';
import { NavigationItem } from '../../../models/content.model';
import { LanguageLinkPipe } from '../../../pipes/language-link.pipe';
import { TranslatePipe } from '../../../pipes/translate.pipe';

/**
 * List of main menu links.
 *
 * @input items - Menu entries rendered in order.
 * @output navigated - Emits after a link is clicked, used to close the mobile menu.
 */
@Component({
  selector: 'app-nav-menu',
  imports: [RouterLink, RouterLinkActive, Icon, TranslatePipe, LanguageLinkPipe],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
})
export class NavMenu {
  readonly items = input.required<NavigationItem[]>();
  readonly navigated = output<void>();
}
