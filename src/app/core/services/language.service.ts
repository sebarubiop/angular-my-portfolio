import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

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
  private translateService = inject(TranslateService);
  
  private currentLanguage = signal<Language>('en');
  
  readonly language = this.currentLanguage.asReadonly();
  
  readonly availableLanguages: LanguageConfig[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  constructor() {
    // Set up default language for translate service
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  initializeLanguage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.translateService.use('en');
      return;
    }

    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
      this.setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      if (['en', 'es'].includes(browserLang)) {
        this.setLanguage(browserLang);
      } else {
        this.setLanguage('en');
      }
    }
  }

  setLanguage(language: Language): void {
    this.currentLanguage.set(language);
    this.translateService.use(language);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', language);
    }
  }

  getCurrentLanguageConfig(): LanguageConfig {
    return this.availableLanguages.find(lang => lang.code === this.currentLanguage()) || this.availableLanguages[0];
  }

  // Convenience methods for translation
  translate(key: string, params?: any): string {
    return this.translateService.instant(key, params);
  }

  translateAsync(key: string, params?: any) {
    return this.translateService.get(key, params);
  }
}