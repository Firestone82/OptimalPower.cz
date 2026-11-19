import { Component, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ContactMessage } from '../../models/contact-message.model';
import { LanguageLinkPipe } from '../../pipes/language-link.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { FormField } from './form-field/form-field';

export type ContactFormStatus = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Inquiry form with client side validation.
 *
 * @input status - Sending state controlled by the parent; `sent` resets the form.
 * @output submitted - Emits the valid form value.
 */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, RouterLink, NgIcon, FormField, TranslatePipe, LanguageLinkPipe],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  readonly status = input<ContactFormStatus>('idle');
  readonly submitted = output<ContactMessage>();

  protected readonly form = inject(NonNullableFormBuilder).group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s]{9,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    message: [''],
    consent: [false, Validators.requiredTrue],
  });

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
    const { consent: _consent, ...message } = this.form.getRawValue();
    this.submitted.emit(message);
  }
}
