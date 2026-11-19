import { Component, DestroyRef, effect, inject, input, signal, untracked } from '@angular/core';

/** `running` creeps towards the end, `done` fills the bar and fades it out. */
type ProgressState = 'idle' | 'running' | 'done';

/** How long the filled bar stays before it resets, matches the fade in `progress-bar.scss`. */
const FINISH_MS = 400;

/**
 * Loading bar pinned to the top of the viewport. It creeps forward while work is pending and
 * fills up when it is done. Short tasks finish before the bar fades in, so it never flashes.
 *
 * @input active - Shows the bar while `true`.
 */
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
  host: { '[class]': 'state()' },
})
export class ProgressBar {
  readonly active = input(false);

  protected readonly state = signal<ProgressState>('idle');

  constructor() {
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    inject(DestroyRef).onDestroy(() => clearTimeout(resetTimer));

    effect(() => {
      const active = this.active();
      untracked(() => {
        clearTimeout(resetTimer);
        if (active) {
          this.state.set('running');
        } else if (this.state() === 'running') {
          this.state.set('done');
          resetTimer = setTimeout(() => this.state.set('idle'), FINISH_MS);
        }
      });
    });
  }
}
