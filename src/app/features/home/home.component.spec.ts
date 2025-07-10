import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero section with correct content', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.hero-title').textContent).toContain('Sebastian Rubio');
    expect(compiled.querySelector('.hero-subtitle').textContent).toContain('Senior Frontend Developer');
    expect(compiled.querySelector('.hero-description').textContent).toContain('8+ years');
  });

  it('should display technology chips', () => {
    const techChips = fixture.nativeElement.querySelectorAll('.tech-chip');
    expect(techChips.length).toBe(component.technologies.length);
    
    const firstChip = techChips[0];
    expect(firstChip.textContent.trim()).toContain('Angular');
  });

  it('should display stats cards', () => {
    const statCards = fixture.nativeElement.querySelectorAll('.stat-card');
    expect(statCards.length).toBe(component.stats.length);
    
    const firstStat = statCards[0];
    expect(firstStat.textContent).toContain('8+');
    expect(firstStat.textContent).toContain('Years Experience');
  });

  it('should display featured projects', () => {
    const projectCards = fixture.nativeElement.querySelectorAll('.project-card');
    expect(projectCards.length).toBe(component.featuredProjects.length);
    
    const firstProject = projectCards[0];
    expect(firstProject.textContent).toContain('E-Commerce Platform');
  });

  it('should have working CTA buttons', () => {
    const primaryCta = fixture.nativeElement.querySelector('.primary-cta');
    const secondaryCta = fixture.nativeElement.querySelector('.secondary-cta');
    
    expect(primaryCta).toBeTruthy();
    expect(secondaryCta).toBeTruthy();
    expect(primaryCta.textContent).toContain('View My Work');
    expect(secondaryCta.textContent).toContain('Get In Touch');
  });

  it('should display hero image', () => {
    const heroImage = fixture.nativeElement.querySelector('.hero-image img');
    expect(heroImage).toBeTruthy();
    expect(heroImage.alt).toContain('Sebastian Rubio');
  });

  it('should have proper data structure for technologies', () => {
    expect(component.technologies).toBeDefined();
    expect(component.technologies.length).toBeGreaterThan(0);
    expect(component.technologies[0]).toHaveProperty('name');
    expect(component.technologies[0]).toHaveProperty('icon');
  });

  it('should have proper data structure for stats', () => {
    expect(component.stats).toBeDefined();
    expect(component.stats.length).toBe(4);
    expect(component.stats[0]).toHaveProperty('icon');
    expect(component.stats[0]).toHaveProperty('number');
    expect(component.stats[0]).toHaveProperty('label');
  });

  it('should have proper data structure for featured projects', () => {
    expect(component.featuredProjects).toBeDefined();
    expect(component.featuredProjects.length).toBe(3);
    expect(component.featuredProjects[0]).toHaveProperty('title');
    expect(component.featuredProjects[0]).toHaveProperty('description');
    expect(component.featuredProjects[0]).toHaveProperty('technologies');
  });
});