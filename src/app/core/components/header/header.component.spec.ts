import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { signal } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockThemeService: jest.Mocked<ThemeService>;
  let mockLanguageService: jest.Mocked<LanguageService>;

  beforeEach(async () => {
    mockThemeService = {
      isDarkMode: jest.fn().mockReturnValue(false),
      toggleTheme: jest.fn(),
    } as any;

    mockLanguageService = {
      language: signal('en'),
      availableLanguages: [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' }
      ],
      getCurrentLanguageConfig: jest.fn().mockReturnValue({
        code: 'en',
        name: 'English',
        flag: '🇺🇸'
      }),
      setLanguage: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, NoopAnimationsModule],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: LanguageService, useValue: mockLanguageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header title and subtitle', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.header-title').textContent).toContain('Sebastian Rubio');
    expect(compiled.querySelector('.header-subtitle').textContent).toContain('Frontend Developer');
  });

  it('should emit menu click event', () => {
    spyOn(component.menuClick, 'emit');
    component.showMenuButton = true;
    fixture.detectChanges();

    const menuButton = fixture.nativeElement.querySelector('.menu-button');
    menuButton.click();

    expect(component.menuClick.emit).toHaveBeenCalled();
  });

  it('should toggle theme when theme button is clicked', () => {
    const themeButton = fixture.nativeElement.querySelector('.theme-toggle');
    themeButton.click();

    expect(mockThemeService.toggleTheme).toHaveBeenCalled();
  });

  it('should show menu button when showMenuButton is true', () => {
    component.showMenuButton = true;
    fixture.detectChanges();

    const menuButton = fixture.nativeElement.querySelector('.menu-button');
    expect(menuButton).toBeTruthy();
  });

  it('should hide menu button when showMenuButton is false', () => {
    component.showMenuButton = false;
    fixture.detectChanges();

    const menuButton = fixture.nativeElement.querySelector('.menu-button');
    expect(menuButton).toBeFalsy();
  });

  it('should display correct theme icon based on current theme', () => {
    mockThemeService.isDarkMode.mockReturnValue(true);
    fixture.detectChanges();

    const themeIcon = fixture.nativeElement.querySelector('.theme-toggle mat-icon');
    expect(themeIcon.textContent.trim()).toBe('light_mode');

    mockThemeService.isDarkMode.mockReturnValue(false);
    fixture.detectChanges();

    expect(themeIcon.textContent.trim()).toBe('dark_mode');
  });

  it('should display current language flag', () => {
    const flagElement = fixture.nativeElement.querySelector('.flag-icon');
    expect(flagElement.textContent.trim()).toBe('🇺🇸');
  });
});