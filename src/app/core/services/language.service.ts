import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'en' | 'es';

interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  
  private currentLanguage = signal<Language>('en');
  
  readonly language = this.currentLanguage.asReadonly();
  
  readonly availableLanguages: LanguageConfig[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  initializeLanguage(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
      this.currentLanguage.set(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      if (['en', 'es'].includes(browserLang)) {
        this.currentLanguage.set(browserLang);
      }
    }
  }

  setLanguage(language: Language): void {
    this.currentLanguage.set(language);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', language);
    }
  }

  getCurrentLanguageConfig(): LanguageConfig {
    return this.availableLanguages.find(lang => lang.code === this.currentLanguage()) || this.availableLanguages[0];
  }
}