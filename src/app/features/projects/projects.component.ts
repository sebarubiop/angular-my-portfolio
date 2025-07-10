import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatDialogModule
  ],
  template: `
    <div class="projects-container">
      <div class="projects-header">
        <h1 class="page-title">My Projects</h1>
        <p class="page-subtitle">A showcase of my work across different technologies and domains</p>
      </div>

      <mat-tab-group class="projects-tabs" animationDuration="300ms">
        <mat-tab label="All Projects">
          <div class="tab-content">
            <div class="projects-grid">
              <mat-card *ngFor="let project of allProjects" class="project-card">
                <div class="project-image-container">
                  <img [src]="project.image" [alt]="project.title" class="project-image" loading="lazy">
                  <div class="project-overlay">
                    <div class="overlay-content">
                      <button mat-fab color="primary" class="project-action" *ngIf="project.liveUrl">
                        <mat-icon>launch</mat-icon>
                      </button>
                      <button mat-fab class="project-action github-btn" *ngIf="project.githubUrl">
                        <mat-icon>code</mat-icon>
                      </button>
                    </div>
                  </div>
                </div>
                
                <mat-card-content class="project-content">
                  <div class="project-header">
                    <h3 class="project-title">{{ project.title }}</h3>
                    <div class="project-category">{{ project.category }}</div>
                  </div>
                  
                  <p class="project-description">{{ project.description }}</p>
                  
                  <div class="project-features">
                    <h5 class="features-title">Key Features:</h5>
                    <ul class="features-list">
                      <li *ngFor="let feature of project.features">{{ feature }}</li>
                    </ul>
                  </div>
                  
                  <div class="project-tech">
                    <mat-chip-set>
                      <mat-chip *ngFor="let tech of project.technologies" class="tech-chip">
                        {{ tech }}
                      </mat-chip>
                    </mat-chip-set>
                  </div>
                </mat-card-content>
                
                <mat-card-actions class="project-actions">
                  <button mat-stroked-button color="primary" (click)="openProjectDetails(project)">
                    <mat-icon>info</mat-icon>
                    Details
                  </button>
                  <button mat-button color="primary" *ngIf="project.liveUrl">
                    <mat-icon>launch</mat-icon>
                    Live Demo
                  </button>
                  <button mat-button *ngIf="project.githubUrl">
                    <mat-icon>code</mat-icon>
                    Source
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Featured">
          <div class="tab-content">
            <div class="featured-projects">
              <div *ngFor="let project of featuredProjects" class="featured-project">
                <mat-card class="featured-card">
                  <div class="featured-content">
                    <div class="featured-info">
                      <span class="featured-badge">Featured Project</span>
                      <h2 class="featured-title">{{ project.title }}</h2>
                      <p class="featured-description">{{ project.description }}</p>
                      
                      <div class="featured-highlights">
                        <h4 class="highlights-title">Project Highlights:</h4>
                        <ul class="highlights-list">
                          <li *ngFor="let highlight of project.highlights">{{ highlight }}</li>
                        </ul>
                      </div>
                      
                      <div class="featured-tech">
                        <mat-chip-set>
                          <mat-chip *ngFor="let tech of project.technologies" class="featured-tech-chip">
                            {{ tech }}
                          </mat-chip>
                        </mat-chip-set>
                      </div>
                      
                      <div class="featured-actions">
                        <button mat-raised-button color="primary" *ngIf="project.liveUrl">
                          <mat-icon>launch</mat-icon>
                          View Live Project
                        </button>
                        <button mat-stroked-button color="primary" *ngIf="project.githubUrl">
                          <mat-icon>code</mat-icon>
                          View Source
                        </button>
                      </div>
                    </div>
                    
                    <div class="featured-image">
                      <img [src]="project.image" [alt]="project.title" loading="lazy">
                    </div>
                  </div>
                </mat-card>
              </div>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Open Source">
          <div class="tab-content">
            <div class="opensource-section">
              <h2 class="section-title">Open Source Contributions</h2>
              <div class="opensource-grid">
                <mat-card *ngFor="let project of openSourceProjects" class="opensource-card">
                  <mat-card-content>
                    <div class="opensource-header">
                      <div class="opensource-icon">
                        <mat-icon>{{ project.icon }}</mat-icon>
                      </div>
                      <div class="opensource-info">
                        <h3 class="opensource-title">{{ project.title }}</h3>
                        <p class="opensource-type">{{ project.type }}</p>
                      </div>
                      <div class="opensource-stats">
                        <div class="stat-item">
                          <mat-icon>star</mat-icon>
                          <span>{{ project.stars }}</span>
                        </div>
                        <div class="stat-item">
                          <mat-icon>call_split</mat-icon>
                          <span>{{ project.forks }}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p class="opensource-description">{{ project.description }}</p>
                    
                    <div class="opensource-contribution">
                      <strong>My Contribution:</strong>
                      <p>{{ project.contribution }}</p>
                    </div>
                    
                    <div class="opensource-tech">
                      <mat-chip-set>
                        <mat-chip *ngFor="let tech of project.technologies" class="tech-chip">
                          {{ tech }}
                        </mat-chip>
                      </mat-chip-set>
                    </div>
                  </mat-card-content>
                  
                  <mat-card-actions>
                    <button mat-button color="primary">
                      <mat-icon>launch</mat-icon>
                      View on GitHub
                    </button>
                  </mat-card-actions>
                </mat-card>
              </div>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .projects-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px 40px;
    }

    .projects-header {
      text-align: center;
      margin-bottom: 48px;
    }

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      margin: 0 0 16px;
      color: var(--on-surface-color);
    }

    .page-subtitle {
      font-size: 1.25rem;
      color: var(--on-surface-variant-color);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .projects-tabs {
      margin-bottom: 40px;
    }

    .tab-content {
      padding: 32px 0;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 600;
      margin: 0 0 32px;
      color: var(--on-surface-color);
      text-align: center;
    }

    /* All Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 32px;
    }

    .project-card {
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .project-image-container {
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .project-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .project-card:hover .project-image {
      transform: scale(1.05);
    }

    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .project-card:hover .project-overlay {
      opacity: 1;
    }

    .overlay-content {
      display: flex;
      gap: 16px;
    }

    .project-action {
      width: 56px;
      height: 56px;
    }

    .github-btn {
      background-color: #333;
      color: white;
    }

    .project-content {
      padding: 24px;
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .project-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      color: var(--on-surface-color);
    }

    .project-category {
      background-color: var(--primary-color);
      color: var(--on-primary-color);
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .project-description {
      font-size: 1rem;
      line-height: 1.6;
      margin: 0 0 20px;
      color: var(--on-surface-variant-color);
    }

    .features-title {
      font-size: 0.875rem;
      font-weight: 600;
      margin: 0 0 8px;
      color: var(--on-surface-color);
    }

    .features-list {
      margin: 0 0 20px;
      padding-left: 20px;
    }

    .features-list li {
      font-size: 0.875rem;
      margin-bottom: 4px;
      color: var(--on-surface-variant-color);
    }

    .project-tech {
      margin-bottom: 16px;
    }

    .tech-chip {
      margin: 2px;
      background-color: var(--surface-variant-color);
      color: var(--on-surface-variant-color);
      font-size: 0.75rem;
    }

    .project-actions {
      padding: 16px 24px;
      background-color: var(--surface-variant-color);
    }

    /* Featured Projects */
    .featured-projects {
      max-width: 1200px;
      margin: 0 auto;
    }

    .featured-project {
      margin-bottom: 48px;
    }

    .featured-card {
      overflow: hidden;
    }

    .featured-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
      padding: 48px;
    }

    .featured-badge {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 16px;
    }

    .featured-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 24px;
      color: var(--on-surface-color);
    }

    .featured-description {
      font-size: 1.25rem;
      line-height: 1.6;
      margin: 0 0 32px;
      color: var(--on-surface-variant-color);
    }

    .highlights-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 12px;
      color: var(--on-surface-color);
    }

    .highlights-list {
      margin: 0 0 32px;
      padding-left: 20px;
    }

    .highlights-list li {
      font-size: 1rem;
      margin-bottom: 8px;
      line-height: 1.5;
      color: var(--on-surface-variant-color);
    }

    .featured-tech {
      margin-bottom: 32px;
    }

    .featured-tech-chip {
      margin: 4px;
      background-color: var(--primary-color-light);
      color: var(--primary-color);
      font-size: 0.875rem;
    }

    .featured-actions {
      display: flex;
      gap: 16px;
    }

    .featured-image {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .featured-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Open Source Projects */
    .opensource-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .opensource-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .opensource-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .opensource-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 16px;
    }

    .opensource-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      background-color: var(--primary-color);
      color: var(--on-primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .opensource-info {
      flex: 1;
    }

    .opensource-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 4px;
      color: var(--on-surface-color);
    }

    .opensource-type {
      font-size: 0.875rem;
      margin: 0;
      color: var(--primary-color);
      font-weight: 500;
    }

    .opensource-stats {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      color: var(--on-surface-variant-color);
    }

    .stat-item mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .opensource-description {
      font-size: 0.875rem;
      line-height: 1.6;
      margin: 0 0 16px;
      color: var(--on-surface-variant-color);
    }

    .opensource-contribution {
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0 0 16px;
      padding: 12px;
      background-color: var(--surface-variant-color);
      border-radius: 8px;
      border-left: 4px solid var(--secondary-color);
    }

    .opensource-contribution strong {
      color: var(--on-surface-color);
    }

    .opensource-contribution p {
      margin: 4px 0 0;
      color: var(--on-surface-variant-color);
    }

    .opensource-tech {
      margin-bottom: 16px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .projects-container {
        padding: 0 16px 40px;
      }

      .page-title {
        font-size: 2.5rem;
      }

      .page-subtitle {
        font-size: 1.125rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }

      .featured-content {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 32px 24px;
      }

      .featured-image {
        order: -1;
      }

      .featured-title {
        font-size: 2rem;
      }

      .featured-description {
        font-size: 1.125rem;
      }

      .featured-actions {
        flex-direction: column;
        gap: 12px;
      }

      .opensource-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 2rem;
      }

      .section-title {
        font-size: 1.75rem;
      }

      .featured-title {
        font-size: 1.75rem;
      }

      .project-title {
        font-size: 1.25rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent {
  constructor(private dialog: MatDialog) {}

  allProjects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Application',
      description: 'Modern e-commerce solution with Angular, featuring real-time inventory management, payment integration, and responsive design.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: [
        'Real-time inventory tracking',
        'Secure payment processing',
        'Mobile-responsive design',
        'Admin dashboard',
        'Multi-language support'
      ],
      technologies: ['Angular', 'TypeScript', 'Material Design', 'RxJS', 'Firebase'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Task Management App',
      category: 'Productivity',
      description: 'Collaborative project management tool with real-time updates, team collaboration features, and advanced analytics.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: [
        'Real-time collaboration',
        'Drag & drop interface',
        'Time tracking',
        'Advanced analytics',
        'Team management'
      ],
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Dashboard Analytics',
      category: 'Data Visualization',
      description: 'Real-time analytics dashboard with interactive charts, data visualization, and comprehensive reporting features.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: [
        'Interactive charts',
        'Real-time data updates',
        'Custom reports',
        'Data export',
        'Role-based access'
      ],
      technologies: ['Angular', 'D3.js', 'Firebase', 'Chart.js', 'Material Design'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Social Media Platform',
      category: 'Social Network',
      description: 'Full-featured social media platform with posts, messaging, stories, and advanced privacy controls.',
      image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: [
        'Real-time messaging',
        'Story sharing',
        'Privacy controls',
        'Content moderation',
        'Push notifications'
      ],
      technologies: ['React', 'Express.js', 'PostgreSQL', 'Redis', 'AWS'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Learning Management System',
      category: 'Education',
      description: 'Comprehensive LMS with course creation, student tracking, assessments, and progress analytics.',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: [
        'Course creation tools',
        'Student progress tracking',
        'Online assessments',
        'Video streaming',
        'Certificate generation'
      ],
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'FFmpeg', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Weather Application',
      category: 'Mobile App',
      description: 'Beautiful weather app with forecasts, maps, alerts, and location-based recommendations.',
      image: 'https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
      features: [
        '7-day forecasts',
        'Interactive maps',
        'Weather alerts',
        'Location detection',
        'Offline support'
      ],
      technologies: ['React Native', 'Redux', 'Weather API', 'Maps API', 'SQLite'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  featuredProjects = [
    {
      title: 'Enterprise E-Commerce Platform',
      description: 'A comprehensive e-commerce solution built for enterprise clients, featuring advanced inventory management, multi-vendor support, and sophisticated analytics. This project serves over 100,000 active users and processes millions in transactions monthly.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      highlights: [
        'Handles 100,000+ concurrent users with 99.9% uptime',
        'Processes $2M+ in monthly transactions',
        'Supports 15+ payment gateways and 30+ currencies',
        'Advanced ML-powered recommendation engine',
        'Real-time inventory synchronization across 50+ warehouses',
        'Comprehensive admin dashboard with 40+ KPI metrics'
      ],
      technologies: ['Angular 16', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Real-Time Collaboration Platform',
      description: 'A cutting-edge collaboration platform that enables teams to work together in real-time with features like live document editing, video conferencing, and project management. Used by Fortune 500 companies worldwide.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      highlights: [
        'Real-time collaborative editing with operational transforms',
        'Integrated HD video conferencing for up to 100 participants',
        'Advanced project management with Gantt charts and timelines',
        'AI-powered meeting transcription and summarization',
        'End-to-end encryption for enterprise security',
        'Mobile apps with offline synchronization'
      ],
      technologies: ['React', 'WebRTC', 'Socket.io', 'MongoDB', 'TensorFlow.js', 'WebAssembly'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  openSourceProjects = [
    {
      title: 'Angular UI Components',
      type: 'Component Library',
      icon: 'widgets',
      description: 'A comprehensive Angular component library with 50+ reusable components following Material Design principles.',
      contribution: 'Created the initial architecture, built 20+ core components, and maintain the testing framework.',
      technologies: ['Angular', 'TypeScript', 'Storybook', 'Jest'],
      stars: '2.3k',
      forks: '456'
    },
    {
      title: 'React Performance Tools',
      type: 'Developer Tools',
      icon: 'speed',
      description: 'Performance monitoring and optimization tools for React applications with real-time metrics.',
      contribution: 'Developed the performance profiler and memory leak detection algorithms.',
      technologies: ['React', 'WebAssembly', 'Chrome APIs', 'TypeScript'],
      stars: '1.8k',
      forks: '234'
    },
    {
      title: 'Web Accessibility Checker',
      type: 'Accessibility Tool',
      icon: 'accessibility',
      description: 'Automated accessibility testing tool that helps developers build more inclusive web applications.',
      contribution: 'Lead maintainer, implemented WCAG 2.1 compliance checks and browser extension.',
      technologies: ['JavaScript', 'Puppeteer', 'ARIA', 'WebExtensions'],
      stars: '3.1k',
      forks: '567'
    },
    {
      title: 'TypeScript Utilities',
      type: 'Utility Library',
      icon: 'code',
      description: 'Collection of TypeScript utilities and type definitions for common programming patterns.',
      contribution: 'Created advanced type utilities and functional programming helpers.',
      technologies: ['TypeScript', 'Jest', 'Rollup', 'npm'],
      stars: '1.2k',
      forks: '189'
    }
  ];

  openProjectDetails(project: any): void {
    // Implementation for project details modal would go here
    console.log('Opening project details for:', project.title);
  }
}