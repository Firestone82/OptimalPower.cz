import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationItem } from '../../models/content.model';
import { LanguageLinkPipe } from '../../pipes/language-link.pipe';
import { LanguageSwitcher } from './language-switcher/language-switcher';
import { MenuToggle } from './menu-toggle/menu-toggle';
import { NavMenu } from './nav-menu/nav-menu';

/**
 * Sticky top bar with the main menu and language switcher.
 *
 * @input logo - URL of the logo image.
 * @input companyName - Used as the logo's alt text.
 * @input items - Main menu entries.
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LanguageLinkPipe, NavMenu, MenuToggle, LanguageSwitcher],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  host: {
    '[class.scrolled]': 'scrolled()',
    '(window:scroll)': 'onScroll()',
  },
})
export class Navbar {
  readonly logo = input.required<string>();
  readonly companyName = input.required<string>();
  readonly items = input.required<NavigationItem[]>();

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
