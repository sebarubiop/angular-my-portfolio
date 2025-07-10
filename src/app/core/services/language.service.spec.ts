import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { LanguageService, Language } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => mockLocalStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockLocalStorage[key] = value;
        }),
      },
      writable: true,
    });

    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true,
    });

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with English by default', () => {
    expect(service.language()).toBe('en');
  });

  it('should set language and persist to localStorage', () => {
    const newLanguage: Language = 'es';
    service.setLanguage(newLanguage);
    
    expect(service.language()).toBe(newLanguage);
    expect(localStorage.setItem).toHaveBeenCalledWith('language', newLanguage);
  });

  it('should load saved language from localStorage on initialization', () => {
    mockLocalStorage['language'] = 'es';
    service.initializeLanguage();
    expect(service.language()).toBe('es');
  });

  it('should detect browser language on initialization', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'es-ES',
      writable: true,
    });
    
    service.initializeLanguage();
    expect(service.language()).toBe('es');
  });

  it('should return correct language configuration', () => {
    service.setLanguage('es');
    const config = service.getCurrentLanguageConfig();
    
    expect(config.code).toBe('es');
    expect(config.name).toBe('Español');
    expect(config.flag).toBe('🇪🇸');
  });

  it('should handle invalid language values gracefully', () => {
    mockLocalStorage['language'] = 'invalid-lang';
    service.initializeLanguage();
    expect(service.language()).toBe('en');
  });

  it('should provide available languages', () => {
    expect(service.availableLanguages).toHaveLength(2);
    expect(service.availableLanguages[0].code).toBe('en');
    expect(service.availableLanguages[1].code).toBe('es');
  });
});