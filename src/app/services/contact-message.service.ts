import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContactMessage } from '../models/contact-message.model';
import { toMailHref } from '../utils/contact.util';

@Injectable({ providedIn: 'root' })
export class ContactMessageService {
  private readonly http = inject(HttpClient);

  /** Posts to `endpoint`, or opens the visitor's mail client when no endpoint is configured. */
  send(message: ContactMessage, endpoint: string, fallbackEmail: string): Observable<unknown> {
    if (endpoint) {
      return this.http.post(endpoint, message, { headers: { Accept: 'application/json' } });
    }

    const body = [
      `${message.firstName} ${message.lastName}`,
      `${message.phone} | ${message.email}`,
      '',
      message.message,
    ].join('\n');
    window.location.href = toMailHref(fallbackEmail, 'Poptávka z webu', body);
    return of(null);
  }
}
