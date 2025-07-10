import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  private currentTheme = signal<Theme>('system');
  private systemDarkMode = signal(false);
  
  readonly theme = this.currentTheme.asReadonly();
  
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSystemTheme();
      this.setupThemeEffect();
    }
  }

  initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      this.currentTheme.set(savedTheme);
    }
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
  }

  toggleTheme(): void {
    const current = this.currentTheme();
    const newTheme: Theme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  isDarkMode(): boolean {
    const theme = this.currentTheme();
    if (theme === 'system') {
      return this.systemDarkMode();
    }
    return theme === 'dark';
  }

  private initializeSystemTheme(): void {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemDarkMode.set(mediaQuery.matches);
      
      mediaQuery.addEventListener('change', (e) => {
        this.systemDarkMode.set(e.matches);
      });
    }
  }

  private setupThemeEffect(): void {
    effect(() => {
      const isDark = this.isDarkMode();
      document.documentElement.classList.toggle('dark-theme', isDark);
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDark ? '#1a1a1a' : '#ffffff');
      }
    });
  }
}