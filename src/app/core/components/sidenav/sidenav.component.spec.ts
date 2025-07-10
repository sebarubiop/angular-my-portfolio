import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav.component';
import { of } from 'rxjs';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockBreakpointObserver: jest.Mocked<BreakpointObserver>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    } as any;

    mockBreakpointObserver = {
      isMatched: jest.fn().mockReturnValue(false),
      observe: jest.fn().mockReturnValue(of({ matches: false })),
    } as any;

    await TestBed.configureTestingModule({
      imports: [SidenavComponent, NoopAnimationsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BreakpointObserver, useValue: mockBreakpointObserver }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display profile information', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.profile-name').textContent).toContain('Sebastian Rubio');
    expect(compiled.querySelector('.profile-role').textContent).toContain('Senior Frontend Developer');
    expect(compiled.querySelector('.profile-experience').textContent).toContain('8+ Years Experience');
  });

  it('should display navigation items', () => {
    const navItems = fixture.nativeElement.querySelectorAll('.nav-item');
    expect(navItems.length).toBe(component.navigationItems.length);
    
    const homeItem = navItems[0];
    expect(homeItem.textContent).toContain('Home');
    expect(homeItem.textContent).toContain('Welcome & Overview');
  });

  it('should emit closeSidenav on mobile when navigation item is clicked', () => {
    spyOn(component.closeSidenav, 'emit');
    mockBreakpointObserver.isMatched.mockReturnValue(true);

    component.onNavigate();

    expect(component.closeSidenav.emit).toHaveBeenCalled();
  });

  it('should not emit closeSidenav on desktop when navigation item is clicked', () => {
    spyOn(component.closeSidenav, 'emit');
    mockBreakpointObserver.isMatched.mockReturnValue(false);

    component.onNavigate();

    expect(component.closeSidenav.emit).not.toHaveBeenCalled();
  });

  it('should display profile avatar', () => {
    const avatar = fixture.nativeElement.querySelector('.profile-avatar img');
    expect(avatar).toBeTruthy();
    expect(avatar.alt).toBe('Sebastian Rubio');
  });

  it('should display footer information', () => {
    const footerTexts = fixture.nativeElement.querySelectorAll('.footer-text');
    expect(footerTexts[0].textContent).toContain('Built with Angular 20');
    expect(footerTexts[1].textContent).toContain('© 2025 Sebastian Rubio');
  });
});