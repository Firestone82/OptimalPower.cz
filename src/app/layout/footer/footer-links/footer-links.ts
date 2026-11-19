import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../components/icon/icon';
import { FooterContent } from '../../../models/content.model';
import { LanguageLinkPipe } from '../../../pipes/language-link.pipe';
import { TranslatePipe } from '../../../pipes/translate.pipe';

/**
 * Secondary links column.
 *
 * @input links - Internal routes or external URLs (`external: true`).
 */
@Component({
  selector: 'app-footer-links',
  imports: [RouterLink, Icon, TranslatePipe, LanguageLinkPipe],
  templateUrl: './footer-links.html',
  styleUrl: './footer-links.scss',
})
export class FooterLinks {
  readonly links = input.required<FooterContent['links']>();
}
