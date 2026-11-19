import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/** Loads each external script once and resolves when it has executed. */
@Injectable({ providedIn: 'root' })
export class ScriptLoaderService {
  private readonly document = inject(DOCUMENT);
  private readonly scripts = new Map<string, Promise<void>>();

  load(src: string): Promise<void> {
    if (!this.scripts.has(src)) {
      this.scripts.set(
        src,
        new Promise<void>((resolve, reject) => {
          const script = this.document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => {
            this.scripts.delete(src);
            reject(new Error(`Failed to load ${src}`));
          };
          this.document.head.appendChild(script);
        }),
      );
    }
    return this.scripts.get(src)!;
  }
}
