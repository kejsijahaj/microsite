import { Injectable } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private key = 'theme';

  init() {
    const saved = localStorage.getItem(this.key) as Theme | null;
    const systemPrefersDark = window.matchMedia?.(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.setTheme(saved ?? (systemPrefersDark ? 'dark' : 'light'), false);
  }

  get current(): Theme {
    return (
      (document.documentElement.getAttribute('data-theme') as Theme) || 'light'
    );
  }

  toggle() {
    this.setTheme(this.current === 'dark' ? 'light' : 'dark');
  }

  isDark() {
    return this.current === 'dark';
  }

  setTheme(theme: Theme, animate = true) {
    const root = document.documentElement;

    if (animate) {
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 250);
    }

    root.setAttribute('data-theme', theme);
    localStorage.setItem(this.key, theme);
  }
}
