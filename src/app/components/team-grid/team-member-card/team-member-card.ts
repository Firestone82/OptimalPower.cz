import { Component, computed, input } from '@angular/core';
import { Icon } from '../../icon/icon';
import { TeamMemberContent } from '../../../models/content.model';
import { LocalizePipe } from '../../../pipes/localize.pipe';
import { toPhoneHref } from '../../../utils/contact.util';
import { ProtectedEmail } from '../../protected-email/protected-email';

/**
 * Contact card of a single person.
 *
 * Rows for position, phone and e-mail are always rendered so all cards align.
 *
 * @input member - Name, optional position, phone and encoded e-mail.
 */
@Component({
  selector: 'app-team-member-card',
  imports: [Icon, LocalizePipe, ProtectedEmail],
  templateUrl: './team-member-card.html',
  styleUrl: './team-member-card.scss',
})
export class TeamMemberCard {
  readonly member = input.required<TeamMemberContent>();

  /** Initials without academic titles, e.g. "Ing. Martin Mikula" → "MM". */
  protected readonly initials = computed(() =>
    this.member()
      .name.split(/\s+/)
      .filter((part) => !part.endsWith('.'))
      .map((part) => part[0])
      .join('')
      .slice(0, 2),
  );

  protected readonly toPhoneHref = toPhoneHref;
}
