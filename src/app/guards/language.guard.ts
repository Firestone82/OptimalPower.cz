import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { I18nService } from '../services/i18n.service';
import { isLanguage } from '../utils/language.util';

export const languageGuard: CanMatchFn = (_route, segments) => {
  const language = segments[0]?.path;
  return isLanguage(language) ? inject(I18nService).use(language) : false;
};
