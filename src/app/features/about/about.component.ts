import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="about-container">
      <div class="about-header">
        <h1 class="page-title">About Me</h1>
        <p class="page-subtitle">Get to know more about my journey, skills, and passion for frontend development</p>
      </div>

      <div class="about-content">
        <!-- Personal Story Section -->
        <section class="story-section">
          <mat-card class="story-card">
            <mat-card-content>
              <div class="story-content">
                <div class="story-text">
                  <h2 class="section-title">My Journey</h2>
                  <p class="story-paragraph">
                    With over 8 years of experience in frontend development, I've had the privilege of working 
                    with diverse teams and technologies to create exceptional digital experiences. My journey 
                    began with a computer science degree and a curiosity for how beautiful interfaces come to life.
                  </p>
                  <p class="story-paragraph">
                    I specialize in modern JavaScript frameworks, particularly Angular and React, and I'm passionate 
                    about creating accessible, performant, and user-centered applications. I believe in writing 
                    clean, maintainable code and following best practices that ensure scalability and team collaboration.
                  </p>
                  <p class="story-paragraph">
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                    projects, or mentoring junior developers. I'm always eager to take on new challenges and 
                    continue growing in this ever-evolving field.
                  </p>
                </div>
                <div class="story-image">
                  <img 
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" 
                    alt="Sebastian working on code"
                    loading="lazy">
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </section>

        <!-- Skills Section -->
        <section class="skills-section">
          <h2 class="section-title">Technical Skills</h2>
          <div class="skills-grid">
            <mat-card *ngFor="let category of skillCategories" class="skill-category-card">
              <mat-card-header>
                <mat-icon mat-card-avatar class="category-icon">{{ category.icon }}</mat-icon>
                <mat-card-title>{{ category.name }}</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="skills-list">
                  <div *ngFor="let skill of category.skills" class="skill-item">
                    <div class="skill-header">
                      <span class="skill-name">{{ skill.name }}</span>
                      <span class="skill-level">{{ skill.level }}%</span>
                    </div>
                    <mat-progress-bar 
                      mode="determinate" 
                      [value]="skill.level"
                      class="skill-progress">
                    </mat-progress-bar>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </section>

        <!-- Certifications & Education Section -->
        <section class="education-section">
          <h2 class="section-title">Education & Certifications</h2>
          <div class="education-grid">
            <mat-card *ngFor="let item of education" class="education-card">
              <mat-card-content>
                <div class="education-icon">
                  <mat-icon>{{ item.icon }}</mat-icon>
                </div>
                <h3 class="education-title">{{ item.title }}</h3>
                <p class="education-institution">{{ item.institution }}</p>
                <p class="education-year">{{ item.year }}</p>
                <p class="education-description">{{ item.description }}</p>
              </mat-card-content>
            </mat-card>
          </div>
        </section>

        <!-- Interests Section -->
        <section class="interests-section">
          <h2 class="section-title">Interests & Hobbies</h2>
          <div class="interests-grid">
            <div *ngFor="let interest of interests" class="interest-item">
              <mat-icon class="interest-icon">{{ interest.icon }}</mat-icon>
              <h4 class="interest-title">{{ interest.title }}</h4>
              <p class="interest-description">{{ interest.description }}</p>
            </div>
          </div>
        </section>

        <!-- Values Section -->
        <section class="values-section">
          <mat-card class="values-card">
            <mat-card-content>
              <h2 class="section-title">Core Values</h2>
              <div class="values-grid">
                <div *ngFor="let value of values" class="value-item">
                  <mat-icon class="value-icon">{{ value.icon }}</mat-icon>
                  <h4 class="value-title">{{ value.title }}</h4>
                  <p class="value-description">{{ value.description }}</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px 40px;
    }

    .about-header {
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

    .section-title {
      font-size: 2rem;
      font-weight: 600;
      margin: 0 0 32px;
      color: var(--on-surface-color);
    }

    /* Story Section */
    .story-section {
      margin-bottom: 64px;
    }

    .story-card {
      overflow: hidden;
    }

    .story-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 32px;
      align-items: center;
    }

    .story-paragraph {
      font-size: 1.125rem;
      line-height: 1.7;
      margin: 0 0 24px;
      color: var(--on-surface-variant-color);
    }

    .story-image {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .story-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Skills Section */
    .skills-section {
      margin-bottom: 64px;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }

    .skill-category-card {
      transition: transform 0.3s ease;
    }

    .skill-category-card:hover {
      transform: translateY(-4px);
    }

    .category-icon {
      background-color: var(--primary-color);
      color: var(--on-primary-color);
    }

    .skills-list {
      margin-top: 16px;
    }

    .skill-item {
      margin-bottom: 20px;
    }

    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .skill-name {
      font-weight: 500;
      color: var(--on-surface-color);
    }

    .skill-level {
      font-size: 0.875rem;
      color: var(--primary-color);
      font-weight: 600;
    }

    .skill-progress {
      height: 6px;
      border-radius: 3px;
    }

    /* Education Section */
    .education-section {
      margin-bottom: 64px;
    }

    .education-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .education-card {
      text-align: center;
      transition: transform 0.3s ease;
    }

    .education-card:hover {
      transform: translateY(-4px);
    }

    .education-icon {
      margin: 0 0 16px;
    }

    .education-icon mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: var(--primary-color);
    }

    .education-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 8px;
      color: var(--on-surface-color);
    }

    .education-institution {
      font-size: 1rem;
      font-weight: 500;
      margin: 0 0 4px;
      color: var(--primary-color);
    }

    .education-year {
      font-size: 0.875rem;
      margin: 0 0 12px;
      color: var(--on-surface-variant-color);
    }

    .education-description {
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
      color: var(--on-surface-variant-color);
    }

    /* Interests Section */
    .interests-section {
      margin-bottom: 64px;
    }

    .interests-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .interest-item {
      text-align: center;
      padding: 24px;
      border-radius: 12px;
      background-color: var(--surface-variant-color);
      transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .interest-item:hover {
      transform: translateY(-4px);
      background-color: var(--primary-color-light);
    }

    .interest-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: var(--primary-color);
      margin-bottom: 16px;
    }

    .interest-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 8px;
      color: var(--on-surface-color);
    }

    .interest-description {
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
      color: var(--on-surface-variant-color);
    }

    /* Values Section */
    .values-section {
      margin-bottom: 40px;
    }

    .values-card {
      background: linear-gradient(135deg, var(--primary-color-light), var(--secondary-color-light));
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
      margin-top: 24px;
    }

    .value-item {
      text-align: center;
    }

    .value-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: var(--primary-color);
      margin-bottom: 16px;
    }

    .value-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 12px;
      color: var(--on-surface-color);
    }

    .value-description {
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
      color: var(--on-surface-variant-color);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .about-container {
        padding: 0 16px 40px;
      }

      .page-title {
        font-size: 2.5rem;
      }

      .page-subtitle {
        font-size: 1.125rem;
      }

      .story-content {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .story-image {
        order: -1;
      }

      .skills-grid {
        grid-template-columns: 1fr;
      }

      .education-grid {
        grid-template-columns: 1fr;
      }

      .interests-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .values-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 2rem;
      }

      .section-title {
        font-size: 1.75rem;
      }

      .interests-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {
  skillCategories = [
    {
      name: 'Frontend Frameworks',
      icon: 'web',
      skills: [
        { name: 'Angular', level: 95 },
        { name: 'React', level: 90 },
        { name: 'Vue.js', level: 80 },
        { name: 'TypeScript', level: 95 }
      ]
    },
    {
      name: 'Web Technologies',
      icon: 'code',
      skills: [
        { name: 'HTML5', level: 98 },
        { name: 'CSS3/SCSS', level: 95 },
        { name: 'JavaScript', level: 95 },
        { name: 'Responsive Design', level: 90 }
      ]
    },
    {
      name: 'Backend & Tools',
      icon: 'dns',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Git/GitHub', level: 95 },
        { name: 'AWS', level: 80 },
        { name: 'Docker', level: 75 }
      ]
    }
  ];

  education = [
    {
      title: 'Computer Science Degree',
      institution: 'Universidad Tecnológica Nacional',
      year: '2012 - 2016',
      description: 'Specialized in software engineering and web technologies',
      icon: 'school'
    },
    {
      title: 'Angular Certification',
      institution: 'Google Developers',
      year: '2021',
      description: 'Advanced Angular development and best practices',
      icon: 'verified'
    },
    {
      title: 'AWS Solutions Architect',
      institution: 'Amazon Web Services',
      year: '2022',
      description: 'Cloud architecture and deployment strategies',
      icon: 'cloud'
    }
  ];

  interests = [
    {
      title: 'Open Source',
      description: 'Contributing to community projects and sharing knowledge',
      icon: 'code'
    },
    {
      title: 'Mentoring',
      description: 'Helping junior developers grow in their careers',
      icon: 'school'
    },
    {
      title: 'Photography',
      description: 'Capturing moments and exploring creative composition',
      icon: 'camera_alt'
    },
    {
      title: 'Travel',
      description: 'Exploring new cultures and gaining fresh perspectives',
      icon: 'flight'
    }
  ];

  values = [
    {
      title: 'Quality',
      description: 'I believe in delivering high-quality code that is maintainable, scalable, and follows best practices.',
      icon: 'verified'
    },
    {
      title: 'Collaboration',
      description: 'Great software is built by great teams. I value open communication and knowledge sharing.',
      icon: 'group'
    },
    {
      title: 'Innovation',
      description: 'I stay curious about new technologies and approaches that can improve user experiences.',
      icon: 'lightbulb'
    },
    {
      title: 'Accessibility',
      description: 'Creating inclusive digital experiences that work for everyone is not just good practice—it\'s essential.',
      icon: 'accessibility'
    }
  ];
}