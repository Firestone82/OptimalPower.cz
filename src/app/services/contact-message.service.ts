import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { ContactMessage } from '../models/contact-message.model';
import { ContactFormConfig } from '../models/content.model';

interface Web3FormsResponse {
  success: boolean;
  message: string;
}

/** Sends the contact form through Web3Forms, which also verifies the hCaptcha token. */
@Injectable({ providedIn: 'root' })
export class ContactMessageService {
  private readonly http = inject(HttpClient);

  send(message: ContactMessage, captchaToken: string, config: ContactFormConfig): Observable<void> {
    if (!config.accessKey) {
      return throwError(() => new Error('Contact form access key is not configured.'));
    }

    const payload = {
      access_key: config.accessKey,
      subject: `Poptávka z webu – ${message.firstName} ${message.lastName}`,
      from_name: `${message.firstName} ${message.lastName}`,
      name: `${message.firstName} ${message.lastName}`,
      email: message.email,
      phone: message.phone,
      message: message.message,
      'h-captcha-response': captchaToken,
    };

    return this.http
      .post<Web3FormsResponse>(config.endpoint, payload, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((response) => {
          if (!response.success) throw new Error(response.message);
        }),
      );
  }
}
