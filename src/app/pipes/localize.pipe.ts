import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocalizedText } from '../models/language.model';
import { I18nService } from '../services/i18n.service';

/** `{{ content.title | localize }}` – resolves a `LocalizedText` for the active language. */
@Pipe({ name: 'localize', pure: false })
export class LocalizePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(text: LocalizedText | null | undefined): string {
    return this.i18n.localize(text);
  }
}
