import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ThemeService, Theme } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => mockLocalStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockLocalStorage[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete mockLocalStorage[key];
        }),
        clear: jest.fn(() => {
          mockLocalStorage = {};
        }),
      },
      writable: true,
    });

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with system theme by default', () => {
    expect(service.theme()).toBe('system');
  });

  it('should set theme and persist to localStorage', () => {
    const newTheme: Theme = 'dark';
    service.setTheme(newTheme);
    
    expect(service.theme()).toBe(newTheme);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', newTheme);
  });

  it('should toggle between light and dark themes', () => {
    service.setTheme('light');
    service.toggleTheme();
    expect(service.theme()).toBe('dark');

    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });

  it('should load saved theme from localStorage on initialization', () => {
    mockLocalStorage['theme'] = 'dark';
    service.initializeTheme();
    expect(service.theme()).toBe('dark');
  });

  it('should return correct dark mode status', () => {
    service.setTheme('dark');
    expect(service.isDarkMode()).toBe(true);

    service.setTheme('light');
    expect(service.isDarkMode()).toBe(false);
  });

  it('should handle invalid theme values gracefully', () => {
    mockLocalStorage['theme'] = 'invalid-theme';
    service.initializeTheme();
    expect(service.theme()).toBe('system');
  });
});