import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Language, SUPPORTED_LANGUAGES } from '../../../models/language.model';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { I18nService } from '../../../services/i18n.service';
import { replaceUrlLanguage } from '../../../utils/language.util';

@Component({
  selector: 'app-language-switcher',
  imports: [TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  private readonly router = inject(Router);
  protected readonly i18n = inject(I18nService);
  protected readonly languages = SUPPORTED_LANGUAGES;

  protected switchTo(language: Language): void {
    void this.router.navigateByUrl(replaceUrlLanguage(this.router.url, language));
  }
}
