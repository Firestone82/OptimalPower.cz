import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AnalyticsService } from '../../services/analytics.service';
import { ConsentService } from '../../services/consent.service';
import { ContentService } from '../../services/content.service';
import { CookieBanner } from '../cookie-banner/cookie-banner';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Navbar, Footer, CookieBanner, TranslatePipe],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  private readonly content = inject(ContentService);

  protected readonly company = toSignal(this.content.load('company'));
  protected readonly navigation = toSignal(this.content.load('navigation'));
  protected readonly footer = toSignal(this.content.load('footer'));
  protected readonly consent = inject(ConsentService);

  constructor() {
    const analytics = inject(AnalyticsService);
    effect(() => analytics.init(this.company()?.analyticsId));
  }
}
