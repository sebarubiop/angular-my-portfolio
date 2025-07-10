import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ],
  template: `
    <div class="experience-container">
      <div class="experience-header">
        <h1 class="page-title">Professional Experience</h1>
        <p class="page-subtitle">My career journey through various roles and technologies</p>
      </div>

      <mat-tab-group class="experience-tabs" animationDuration="300ms">
        <mat-tab label="Work Experience">
          <div class="tab-content">
            <div class="timeline">
              <div *ngFor="let job of workExperience; let i = index" class="timeline-item">
                <div class="timeline-marker">
                  <div class="marker-icon">
                    <mat-icon>{{ job.icon }}</mat-icon>
                  </div>
                  <div class="timeline-line" *ngIf="i !== workExperience.length - 1"></div>
                </div>
                
                <mat-card class="experience-card">
                  <mat-card-header>
                    <div class="job-header">
                      <div class="job-info">
                        <h3 class="job-title">{{ job.title }}</h3>
                        <h4 class="job-company">{{ job.company }}</h4>
                        <p class="job-location">{{ job.location }}</p>
                      </div>
                      <div class="job-period">
                        <span class="period-badge">{{ job.period }}</span>
                        <span class="duration">{{ job.duration }}</span>
                      </div>
                    </div>
                  </mat-card-header>
                  
                  <mat-card-content>
                    <p class="job-description">{{ job.description }}</p>
                    
                    <div class="achievements">
                      <h5 class="achievements-title">Key Achievements:</h5>
                      <ul class="achievements-list">
                        <li *ngFor="let achievement of job.achievements">
                          {{ achievement }}
                        </li>
                      </ul>
                    </div>
                    
                    <div class="technologies">
                      <h5 class="tech-title">Technologies Used:</h5>
                      <mat-chip-set>
                        <mat-chip *ngFor="let tech of job.technologies" class="tech-chip">
                          {{ tech }}
                        </mat-chip>
                      </mat-chip-set>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Skills Progress">
          <div class="tab-content">
            <div class="skills-evolution">
              <h2 class="section-title">Skills Evolution Over Time</h2>
              <div class="skills-timeline">
                <div *ngFor="let year of skillsTimeline" class="skills-year-item">
                  <mat-card class="skills-year-card">
                    <mat-card-header>
                      <h3 class="year-title">{{ year.year }}</h3>
                      <p class="year-focus">{{ year.focus }}</p>
                    </mat-card-header>
                    <mat-card-content>
                      <div class="year-skills">
                        <mat-chip-set>
                          <mat-chip *ngFor="let skill of year.skills" class="skill-chip">
                            <mat-icon class="skill-icon">{{ getSkillIcon(skill) }}</mat-icon>
                            {{ skill }}
                          </mat-chip>
                        </mat-chip-set>
                      </div>
                      <p class="year-description">{{ year.description }}</p>
                    </mat-card-content>
                  </mat-card>
                </div>
              </div>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Achievements">
          <div class="tab-content">
            <div class="achievements-section">
              <h2 class="section-title">Professional Achievements</h2>
              <div class="achievements-grid">
                <mat-card *ngFor="let achievement of achievements" class="achievement-card">
                  <mat-card-content>
                    <div class="achievement-icon">
                      <mat-icon>{{ achievement.icon }}</mat-icon>
                    </div>
                    <h3 class="achievement-title">{{ achievement.title }}</h3>
                    <p class="achievement-date">{{ achievement.date }}</p>
                    <p class="achievement-description">{{ achievement.description }}</p>
                    <div class="achievement-impact" *ngIf="achievement.impact">
                      <strong>Impact:</strong> {{ achievement.impact }}
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .experience-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px 40px;
    }

    .experience-header {
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

    .experience-tabs {
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

    /* Timeline Styles */
    .timeline {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
    }

    .timeline-item {
      display: flex;
      margin-bottom: 32px;
      position: relative;
    }

    .timeline-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 24px;
      flex-shrink: 0;
    }

    .marker-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: var(--on-primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 2;
    }

    .timeline-line {
      width: 2px;
      flex: 1;
      background-color: var(--border-color);
      margin-top: 16px;
      min-height: 100px;
    }

    .experience-card {
      flex: 1;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .experience-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }

    .job-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 8px;
      color: var(--on-surface-color);
    }

    .job-company {
      font-size: 1.25rem;
      font-weight: 500;
      margin: 0 0 4px;
      color: var(--primary-color);
    }

    .job-location {
      font-size: 0.875rem;
      margin: 0;
      color: var(--on-surface-variant-color);
    }

    .job-period {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-align: right;
    }

    .period-badge {
      background-color: var(--primary-color);
      color: var(--on-primary-color);
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .duration {
      font-size: 0.75rem;
      color: var(--on-surface-variant-color);
    }

    .job-description {
      font-size: 1rem;
      line-height: 1.6;
      margin: 16px 0 24px;
      color: var(--on-surface-variant-color);
    }

    .achievements-title, .tech-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 12px;
      color: var(--on-surface-color);
    }

    .achievements-list {
      margin: 0 0 24px;
      padding-left: 20px;
    }

    .achievements-list li {
      margin-bottom: 8px;
      line-height: 1.5;
      color: var(--on-surface-variant-color);
    }

    .technologies {
      margin-top: 24px;
    }

    .tech-chip {
      margin: 2px;
      background-color: var(--surface-variant-color);
      color: var(--on-surface-variant-color);
    }

    /* Skills Timeline */
    .skills-timeline {
      display: grid;
      gap: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    .skills-year-card {
      transition: transform 0.3s ease;
    }

    .skills-year-card:hover {
      transform: translateY(-2px);
    }

    .year-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      color: var(--primary-color);
    }

    .year-focus {
      font-size: 1rem;
      margin: 4px 0 0;
      color: var(--on-surface-variant-color);
      font-style: italic;
    }

    .year-skills {
      margin: 16px 0;
    }

    .skill-chip {
      margin: 2px;
      background-color: var(--primary-color-light);
      color: var(--primary-color);
    }

    .skill-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }

    .year-description {
      font-size: 0.875rem;
      line-height: 1.6;
      margin: 16px 0 0;
      color: var(--on-surface-variant-color);
    }

    /* Achievements Grid */
    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .achievement-card {
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .achievement-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .achievement-icon {
      margin: 0 0 16px;
    }

    .achievement-icon mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: var(--secondary-color);
    }

    .achievement-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 8px;
      color: var(--on-surface-color);
    }

    .achievement-date {
      font-size: 0.875rem;
      margin: 0 0 12px;
      color: var(--primary-color);
      font-weight: 500;
    }

    .achievement-description {
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0 0 12px;
      color: var(--on-surface-variant-color);
    }

    .achievement-impact {
      font-size: 0.875rem;
      padding: 12px;
      background-color: var(--surface-variant-color);
      border-radius: 8px;
      border-left: 4px solid var(--secondary-color);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .experience-container {
        padding: 0 16px 40px;
      }

      .page-title {
        font-size: 2.5rem;
      }

      .page-subtitle {
        font-size: 1.125rem;
      }

      .timeline {
        max-width: 100%;
      }

      .timeline-marker {
        margin-right: 16px;
      }

      .marker-icon {
        width: 40px;
        height: 40px;
      }

      .job-header {
        flex-direction: column;
        gap: 16px;
      }

      .job-period {
        align-items: flex-start;
        text-align: left;
      }

      .achievements-grid {
        grid-template-columns: 1fr;
      }

      .skills-timeline {
        padding: 0 8px;
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 2rem;
      }

      .section-title {
        font-size: 1.75rem;
      }

      .job-title {
        font-size: 1.25rem;
      }

      .job-company {
        font-size: 1.125rem;
      }
    }
  `]
})
export class ExperienceComponent {
  workExperience = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'Buenos Aires, Argentina',
      period: '2021 - Present',
      duration: '3+ years',
      icon: 'laptop_mac',
      description: 'Leading frontend development initiatives for enterprise-scale applications, mentoring junior developers, and architecting scalable solutions.',
      achievements: [
        'Led the migration of legacy applications to Angular 15+, improving performance by 40%',
        'Implemented comprehensive testing strategies, achieving 90% code coverage',
        'Mentored 5+ junior developers and established coding standards for the team',
        'Designed and built reusable component library used across 10+ projects'
      ],
      technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Material Design', 'Jest', 'Cypress']
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Innovations Ltd',
      location: 'Remote',
      period: '2019 - 2021',
      duration: '2 years',
      icon: 'web',
      description: 'Developed responsive web applications for various clients, focusing on user experience and performance optimization.',
      achievements: [
        'Built 15+ responsive web applications with excellent user experience',
        'Reduced page load times by 50% through optimization techniques',
        'Implemented Progressive Web App features for improved mobile experience',
        'Collaborated with UX/UI designers to translate designs into pixel-perfect implementations'
      ],
      technologies: ['React', 'JavaScript', 'SCSS', 'Webpack', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      title: 'Web Developer',
      company: 'StartupHub',
      location: 'Buenos Aires, Argentina',
      period: '2017 - 2019',
      duration: '2 years',
      icon: 'code',
      description: 'Full-stack development role in a fast-paced startup environment, working on MVPs and rapid prototyping.',
      achievements: [
        'Developed 3 successful MVPs that secured Series A funding',
        'Implemented real-time features using WebSockets and Socket.io',
        'Created automated deployment pipelines reducing deployment time by 80%',
        'Built responsive designs that increased mobile conversion by 35%'
      ],
      technologies: ['Vue.js', 'Express.js', 'PostgreSQL', 'Docker', 'Jenkins', 'Bootstrap']
    },
    {
      title: 'Junior Frontend Developer',
      company: 'WebSolutions Agency',
      location: 'Buenos Aires, Argentina',
      period: '2016 - 2017',
      duration: '1 year',
      icon: 'school',
      description: 'Entry-level position focusing on learning modern web development practices and contributing to client projects.',
      achievements: [
        'Successfully completed 20+ client projects with high satisfaction ratings',
        'Learned modern JavaScript frameworks and development tools',
        'Contributed to open-source projects and internal tools',
        'Received "Outstanding New Developer" award'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'PHP', 'WordPress', 'Git']
    }
  ];

  skillsTimeline = [
    {
      year: '2024',
      focus: 'AI Integration & Performance',
      skills: ['Angular 18', 'Signals', 'AI/ML Integration', 'Performance Optimization'],
      description: 'Focusing on cutting-edge Angular features and integrating AI capabilities into web applications.'
    },
    {
      year: '2022-2023',
      focus: 'Architecture & Leadership',
      skills: ['Micro-frontends', 'System Design', 'Team Leadership', 'DevOps'],
      description: 'Transitioned to architectural roles and began leading development teams.'
    },
    {
      year: '2020-2021',
      focus: 'Modern Angular & Testing',
      skills: ['Angular 12+', 'RxJS', 'NgRx', 'Testing (Jest, Cypress)'],
      description: 'Deep dive into modern Angular ecosystem and comprehensive testing strategies.'
    },
    {
      year: '2018-2019',
      focus: 'Full-Stack Development',
      skills: ['React', 'Node.js', 'TypeScript', 'Cloud Platforms'],
      description: 'Expanded to full-stack development and cloud technologies.'
    },
    {
      year: '2016-2017',
      focus: 'Foundation Building',
      skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Git', 'Responsive Design'],
      description: 'Built solid foundation in web development fundamentals.'
    }
  ];

  achievements = [
    {
      title: 'Tech Lead of the Year',
      date: '2023',
      icon: 'star',
      description: 'Recognized for exceptional leadership in driving technical excellence and team growth.',
      impact: 'Led team to 40% improvement in delivery speed and 95% client satisfaction rate.'
    },
    {
      title: 'Open Source Contributor',
      date: '2022',
      icon: 'code',
      description: 'Active contributor to popular Angular and React open-source projects.',
      impact: 'Contributions used by 10,000+ developers worldwide.'
    },
    {
      title: 'Performance Champion',
      date: '2021',
      icon: 'speed',
      description: 'Implemented performance optimizations that significantly improved application speed.',
      impact: 'Achieved 50% reduction in load times across all major applications.'
    },
    {
      title: 'Innovation Award',
      date: '2020',
      icon: 'lightbulb',
      description: 'Created innovative solutions that became standard practice across the organization.',
      impact: 'Developed component library adopted by 5+ teams, saving 200+ development hours.'
    },
    {
      title: 'Mentor Excellence',
      date: '2023',
      icon: 'school',
      description: 'Recognized for outstanding mentorship and knowledge sharing.',
      impact: '100% of mentored developers received promotions within 18 months.'
    },
    {
      title: 'Client Success Award',
      date: '2019',
      icon: 'thumb_up',
      description: 'Delivered exceptional results that exceeded client expectations.',
      impact: 'Achieved 98% client retention rate and multiple contract renewals.'
    }
  ];

  getSkillIcon(skill: string): string {
    const iconMap: { [key: string]: string } = {
      'Angular': 'web',
      'React': 'web',
      'TypeScript': 'code',
      'JavaScript': 'code',
      'Node.js': 'dns',
      'Testing': 'bug_report',
      'DevOps': 'settings',
      'AI/ML': 'psychology',
      'HTML5': 'html',
      'CSS3': 'css',
      'Git': 'source'
    };
    
    return iconMap[skill] || 'code';
  }
}