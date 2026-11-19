import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from '../services/i18n.service';

/** `[routerLink]="'contact' | languageLink"` → `/cs/contact`. */
@Pipe({ name: 'languageLink', pure: false })
export class LanguageLinkPipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(path: string): string {
    return `/${this.i18n.language()}${path ? `/${path}` : ''}`;
  }
}
