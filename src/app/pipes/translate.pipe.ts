import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import { TranslateParams } from '../utils/translate.util';

/** `{{ 'nav.home' | t }}` – impure so it follows language changes. */
@Pipe({ name: 't', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(key: string | null | undefined, params?: TranslateParams): string {
    return key ? this.i18n.translate(key, params) : '';
  }
}
