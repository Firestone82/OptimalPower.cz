import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageLinkPipe } from '../../pipes/language-link.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 * Cookie consent bar pinned to the bottom of the viewport.
 *
 * @output accept - Visitor allowed analytics cookies.
 * @output reject - Visitor allowed only necessary cookies.
 */
@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink, TranslatePipe, LanguageLinkPipe],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.scss',
})
export class CookieBanner {
  readonly accept = output<void>();
  readonly reject = output<void>();
}
