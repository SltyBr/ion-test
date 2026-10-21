import { effect, Service, signal } from '@angular/core';

@Service()
export class Theme {
  dark = signal(window.matchMedia('(prefers-color-scheme:dark)').matches);

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle(
        'ion-palette-dark',
        this.dark(),
      );
    });
  }

  toggle(value: boolean): void {
    this.dark.set(value);
  }
}
