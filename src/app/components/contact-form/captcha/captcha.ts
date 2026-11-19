import {
  Component,
  DestroyRef,
  ElementRef,
  afterRenderEffect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Language } from '../../../models/language.model';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { ScriptLoaderService } from '../../../services/script-loader.service';

interface HCaptcha {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    hcaptcha?: HCaptcha;
  }
}

/**
 * hCaptcha widget. Re-renders when the language changes.
 *
 * @input siteKey - hCaptcha site key.
 * @input language - Widget language.
 * @input active - The hCaptcha script (~0.5 MB) is loaded only once this is `true`.
 * @output tokenChange - Verification token, or `null` once it expires or errors.
 */
@Component({
  selector: 'app-captcha',
  imports: [TranslatePipe],
  templateUrl: './captcha.html',
  styleUrl: './captcha.scss',
})
export class Captcha {
  readonly siteKey = input.required<string>();
  readonly language = input.required<Language>();
  readonly active = input(true);
  readonly tokenChange = output<string | null>();

  private readonly scripts = inject(ScriptLoaderService);
  private readonly container = viewChild.required<ElementRef<HTMLElement>>('container');
  private widgetId: string | null = null;

  protected readonly failed = signal(false);

  constructor() {
    // Browser only, so prerendered pages don't embed the hCaptcha script.
    afterRenderEffect(() => {
      if (this.active()) void this.render(this.siteKey(), this.language());
    });
    inject(DestroyRef).onDestroy(() => this.removeWidget());
  }

  reset(): void {
    if (this.widgetId !== null) window.hcaptcha?.reset(this.widgetId);
    this.tokenChange.emit(null);
  }

  private async render(siteKey: string, language: Language): Promise<void> {
    try {
      // `hl` is read when the script loads, so the language is passed per widget instead.
      await this.scripts.load('https://js.hcaptcha.com/1/api.js?render=explicit');
    } catch {
      this.failed.set(true);
      return;
    }

    this.removeWidget();
    this.tokenChange.emit(null);
    this.widgetId = window.hcaptcha!.render(this.container().nativeElement, {
      sitekey: siteKey,
      hl: language,
      callback: (token: string) => this.tokenChange.emit(token),
      'expired-callback': () => this.tokenChange.emit(null),
      'error-callback': () => this.tokenChange.emit(null),
    });
  }

  private removeWidget(): void {
    if (this.widgetId === null) return;
    window.hcaptcha?.remove(this.widgetId);
    this.widgetId = null;
  }
}
