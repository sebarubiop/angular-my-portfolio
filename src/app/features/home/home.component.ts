import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Hi, I'm <span class="highlight">Sebastian Rubio</span>
            </h1>
            <h2 class="hero-subtitle">Senior Frontend Developer</h2>
            <p class="hero-description">
              Passionate about creating exceptional user experiences with modern web technologies. 
              Specializing in Angular, React, and TypeScript with 8+ years of industry experience.
            </p>
            
            <div class="hero-actions">
              <button 
                mat-raised-button 
                color="primary" 
                routerLink="/projects"
                class="primary-cta">
                <mat-icon>code</mat-icon>
                View My Work
              </button>
              <button 
                mat-stroked-button 
                color="primary" 
                routerLink="/contact"
                class="secondary-cta">
                <mat-icon>contact_mail</mat-icon>
                Get In Touch
              </button>
            </div>
          </div>
          
          <div class="hero-image">
            <div class="image-container">
              <img 
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop" 
                alt="Sebastian Rubio - Frontend Developer"
                loading="eager">
              <div class="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tech Stack Section -->
      <section class="tech-stack-section">
        <h3 class="section-title">Technologies I Work With</h3>
        <div class="tech-grid">
          <mat-chip-set aria-label="Technology stack">
            <mat-chip *ngFor="let tech of technologies" class="tech-chip">
              <mat-icon class="tech-icon">{{ tech.icon }}</mat-icon>
              {{ tech.name }}
            </mat-chip>
          </mat-chip-set>
        </div>
      </section>

      <!-- Quick Stats Section -->
      <section class="stats-section">
        <div class="stats-grid">
          <mat-card *ngFor="let stat of stats" class="stat-card">
            <mat-card-content>
              <div class="stat-icon">
                <mat-icon>{{ stat.icon }}</mat-icon>
              </div>
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </mat-card-content>
          </mat-card>
        </div>
      </section>

      <!-- Featured Work Section -->
      <section class="featured-section">
        <h3 class="section-title">Featured Work</h3>
        <div class="featured-grid">
          <mat-card *ngFor="let project of featuredProjects" class="project-card">
            <div class="project-image">
              <img [src]="project.image" [alt]="project.title" loading="lazy">
            </div>
            <mat-card-content>
              <h4 class="project-title">{{ project.title }}</h4>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <mat-chip *ngFor="let tech of project.technologies" class="tech-chip-small">
                  {{ tech }}
                </mat-chip>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary">
                <mat-icon>launch</mat-icon>
                View Project
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
        
        <div class="section-cta">
          <button mat-stroked-button color="primary" routerLink="/projects" class="view-all-btn">
            View All Projects
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Hero Section */
    .hero-section {
      padding: 40px 0 80px;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.1;
      margin: 0 0 16px;
      color: var(--on-surface-color);
    }

    .highlight {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      font-weight: 400;
      margin: 0 0 24px;
      color: var(--primary-color);
    }

    .hero-description {
      font-size: 1.125rem;
      line-height: 1.6;
      margin: 0 0 32px;
      color: var(--on-surface-variant-color);
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .primary-cta, .secondary-cta {
      height: 48px;
      padding: 0 24px;
      font-size: 1rem;
      transition: transform 0.3s ease;
    }

    .primary-cta:hover, .secondary-cta:hover {
      transform: translateY(-2px);
    }

    .hero-image {
      display: flex;
      justify-content: center;
    }

    .image-container {
      position: relative;
      width: 300px;
      height: 400px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(63, 81, 181, 0.1), rgba(233, 30, 99, 0.1));
    }

    /* Tech Stack Section */
    .tech-stack-section {
      padding: 40px 0;
      text-align: center;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 600;
      margin: 0 0 32px;
      color: var(--on-surface-color);
    }

    .tech-grid {
      display: flex;
      justify-content: center;
    }

    .tech-chip {
      margin: 4px;
      height: 40px;
      font-size: 0.875rem;
      background-color: var(--surface-variant-color);
      color: var(--on-surface-variant-color);
    }

    .tech-icon {
      font-size: 18px;
      margin-right: 4px;
    }

    /* Stats Section */
    .stats-section {
      padding: 40px 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
    }

    .stat-card {
      text-align: center;
      padding: 24px;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
    }

    .stat-icon {
      margin: 0 0 16px;
    }

    .stat-icon mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: var(--primary-color);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 8px;
      color: var(--primary-color);
    }

    .stat-label {
      font-size: 1rem;
      color: var(--on-surface-variant-color);
    }

    /* Featured Section */
    .featured-section {
      padding: 40px 0 80px;
    }

    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .project-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .project-image {
      height: 200px;
      overflow: hidden;
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .project-card:hover .project-image img {
      transform: scale(1.05);
    }

    .project-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 8px;
      color: var(--on-surface-color);
    }

    .project-description {
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0 0 16px;
      color: var(--on-surface-variant-color);
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 16px;
    }

    .tech-chip-small {
      font-size: 0.75rem;
      height: 24px;
      background-color: var(--primary-color-light);
      color: var(--primary-color);
    }

    .section-cta {
      text-align: center;
    }

    .view-all-btn {
      height: 48px;
      padding: 0 24px;
      font-size: 1rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .home-container {
        padding: 0 16px;
      }

      .hero-content {
        grid-template-columns: 1fr;
        gap: 32px;
        text-align: center;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.25rem;
      }

      .hero-description {
        font-size: 1rem;
      }

      .hero-actions {
        justify-content: center;
      }

      .image-container {
        width: 250px;
        height: 320px;
      }

      .section-title {
        font-size: 1.75rem;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      .featured-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .hero-actions {
        flex-direction: column;
        width: 100%;
      }

      .primary-cta, .secondary-cta {
        width: 100%;
      }
    }
  `]
})
export class HomeComponent {
  technologies = [
    { name: 'Angular', icon: 'web' },
    { name: 'React', icon: 'web' },
    { name: 'TypeScript', icon: 'code' },
    { name: 'JavaScript', icon: 'code' },
    { name: 'Node.js', icon: 'dns' },
    { name: 'HTML5', icon: 'html' },
    { name: 'CSS3', icon: 'css' },
    { name: 'Git', icon: 'source' },
    { name: 'AWS', icon: 'cloud' },
    { name: 'Docker', icon: 'developer_board' }
  ];

  stats = [
    { icon: 'work', number: '8+', label: 'Years Experience' },
    { icon: 'code', number: '50+', label: 'Projects Completed' },
    { icon: 'business', number: '15+', label: 'Happy Clients' },
    { icon: 'school', number: '100+', label: 'Skills Mastered' }
  ];

  featuredProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with Angular, featuring real-time inventory, payment integration, and responsive design.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      technologies: ['Angular', 'TypeScript', 'Material Design']
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, team collaboration features, and advanced analytics.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Dashboard Analytics',
      description: 'Real-time analytics dashboard with interactive charts, data visualization, and comprehensive reporting features.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      technologies: ['Angular', 'D3.js', 'Firebase']
    }
  ];
}