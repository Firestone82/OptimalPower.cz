import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { HeroContent } from '../../models/content.model';
import { LanguageLinkPipe } from '../../pipes/language-link.pipe';
import { LocalizePipe } from '../../pipes/localize.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 * Full width intro banner with two call to action links.
 *
 * @input content - Title, subtitle, background image and actions.
 */
@Component({
  selector: 'app-hero',
  imports: [RouterLink, Icon, LocalizePipe, TranslatePipe, LanguageLinkPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly content = input.required<HeroContent>();
}
