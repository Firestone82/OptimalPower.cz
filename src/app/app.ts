import { DOCUMENT } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBar } from './layout/progress-bar/progress-bar';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProgressBar],
  template: '<app-progress-bar [active]="loading.busy()" /><router-outlet />',
})
export class App {
  protected readonly loading = inject(LoadingService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    // The splash screen lives in index.html so it shows before Angular boots.
    const stop = effect(() => {
      if (this.loading.busy()) return;
      this.document.getElementById('app-loader')?.classList.add('hidden');
      stop.destroy();
    });
  }
}
