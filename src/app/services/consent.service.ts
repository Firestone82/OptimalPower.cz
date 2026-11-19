import { Injectable, signal } from '@angular/core';

export type ConsentChoice = 'granted' | 'denied';

const STORAGE_KEY = 'op-analytics-consent';

/** Remembers whether the visitor allowed analytics cookies. */
@Injectable({ providedIn: 'root' })
export class ConsentService {
  /** `null` until the visitor decides. */
  readonly choice = signal<ConsentChoice | null>(readStoredChoice());
  /** True once something on the page needs consent, i.e. analytics is configured. */
  readonly required = signal(false);
  readonly bannerOpen = signal(this.choice() === null);

  decide(choice: ConsentChoice): void {
    this.choice.set(choice);
    this.bannerOpen.set(false);
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only.
    }
  }

  reopen(): void {
    this.bannerOpen.set(true);
  }
}

function readStoredChoice(): ConsentChoice | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
}
