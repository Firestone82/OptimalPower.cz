import { Component, effect, inject, input, output, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { ContactMessage } from '../../models/contact-message.model';
import { LanguageLinkPipe } from '../../pipes/language-link.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Language } from '../../models/language.model';
import { Captcha } from './captcha/captcha';
import { FormField } from './form-field/form-field';

export type ContactFormStatus = 'idle' | 'sending' | 'sent' | 'error';

export interface ContactFormSubmission {
  message: ContactMessage;
  captchaToken: string;
}

/**
 * Inquiry form with client side validation and hCaptcha.
 *
 * @input status - Sending state controlled by the parent; `sent` replaces the form with a
 *   confirmation, `error` resets the captcha so the visitor can retry.
 * @input captchaSiteKey - hCaptcha site key.
 * @input language - Captcha widget language.
 * @output submitted - Valid form value with the captcha token.
 */
@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Icon,
    FormField,
    Captcha,
    TranslatePipe,
    LanguageLinkPipe,
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  readonly status = input<ContactFormStatus>('idle');
  readonly captchaSiteKey = input.required<string>();
  readonly language = input.required<Language>();
  readonly submitted = output<ContactFormSubmission>();

  private readonly captcha = viewChild(Captcha);

  protected readonly form = inject(NonNullableFormBuilder).group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s]{9,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    message: [''],
    consent: [false, Validators.requiredTrue],
    captcha: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      if (this.status() === 'error') this.captcha()?.reset();
    });
  }

  protected setCaptchaToken(token: string | null): void {
    this.form.controls.captcha.setValue(token ?? '');
    this.form.controls.captcha.markAsTouched();
  }

  /** Translation key of the first error of a touched control, or `null`. */
  protected errorOf(name: keyof typeof this.form.controls): string | null {
    const control = this.form.controls[name];
    if (!control.touched || !control.errors) return null;
    return `contact.form.errors.${Object.keys(control.errors)[0]}`;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { consent: _consent, captcha, ...message } = this.form.getRawValue();
    this.submitted.emit({ message, captchaToken: captcha });
  }
}
