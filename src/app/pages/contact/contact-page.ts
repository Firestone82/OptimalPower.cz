import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContactDetails } from '../../components/contact-details/contact-details';
import { ContactForm, ContactFormStatus } from '../../components/contact-form/contact-form';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { TeamGrid } from '../../components/team-grid/team-grid';
import { ContactMessage } from '../../models/contact-message.model';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ContactMessageService } from '../../services/contact-message.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-contact-page',
  imports: [SectionHeading, ContactDetails, ContactForm, TeamGrid, TranslatePipe],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
})
export default class ContactPage {
  private readonly content = inject(ContentService);
  private readonly messages = inject(ContactMessageService);

  protected readonly company = toSignal(this.content.load('company'));
  protected readonly contact = toSignal(this.content.load('contact'));
  protected readonly status = signal<ContactFormStatus>('idle');

  protected send(message: ContactMessage): void {
    const company = this.company();
    const contact = this.contact();
    if (!company || !contact) return;

    this.status.set('sending');
    this.messages.send(message, contact.formEndpoint, company.email).subscribe({
      next: () => this.status.set('sent'),
      error: () => this.status.set('error'),
    });
  }
}
