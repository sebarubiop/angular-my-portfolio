import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';

interface AppFeature {
  name: string;
  icon: string;
  description: string;
  technologies: string[];
  highlights: string[];
  category: 'core' | 'technical' | 'user-experience' | 'performance';
}

interface TechnicalImplementation {
  category: string;
  icon: string;
  items: {
    name: string;
    description: string;
    technologies: string[];
  }[];
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatTooltipModule,
    TranslateModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  constructor(
    public themeService: ThemeService,
    public languageService: LanguageService
  ) {}

  ngOnInit() {
    // Component initialization
  }

  appFeatures: AppFeature[] = [
    {
      name: 'settings.features.responsive_design.name',
      icon: 'devices',
      description: 'settings.features.responsive_design.description',
      technologies: ['CSS Grid', 'Flexbox', 'Material Design', 'SCSS'],
      highlights: [
        'Mobile-first approach',
        'Breakpoint optimization',
        'Touch-friendly interfaces',
        'Cross-browser compatibility'
      ],
      category: 'user-experience'
    },
    {
      name: 'settings.features.internationalization.name',
      icon: 'translate',
      description: 'settings.features.internationalization.description',
      technologies: ['Angular i18n', 'NGX-Translate', 'ICU expressions'],
      highlights: [
        'English and Spanish support',
        'Dynamic language switching',
        'Localized content',
        'Cultural adaptation'
      ],
      category: 'core'
    },
    {
      name: 'settings.features.theme_system.name',
      icon: 'palette',
      description: 'settings.features.theme_system.description',
      technologies: ['Angular Material', 'CSS Custom Properties', 'SCSS'],
      highlights: [
        'Dark/Light mode toggle',
        'System preference detection',
        'Persistent theme storage',
        'Smooth transitions'
      ],
      category: 'user-experience'
    },
    {
      name: 'settings.features.modern_angular.name',
      icon: 'code',
      description: 'settings.features.modern_angular.description',
      technologies: ['Angular 20', 'Standalone Components', 'Signals', 'TypeScript'],
      highlights: [
        'Latest Angular features',
        'Standalone architecture',
        'Type-safe development',
        'Modern best practices'
      ],
      category: 'technical'
    },
    {
      name: 'settings.features.api_integration.name',
      icon: 'api',
      description: 'settings.features.api_integration.description',
      technologies: ['RxJS', 'HTTP Client', 'Error Handling', 'Retry Logic'],
      highlights: [
        'RESTful API consumption',
        'Real-time data updates',
        'Error handling strategies',
        'Loading states management'
      ],
      category: 'technical'
    },
    {
      name: 'settings.features.performance.name',
      icon: 'speed',
      description: 'settings.features.performance.description',
      technologies: ['Lazy Loading', 'OnPush Strategy', 'Tree Shaking', 'Bundle Optimization'],
      highlights: [
        'Route-based code splitting',
        'Optimized bundle sizes',
        'Fast loading times',
        'Efficient change detection'
      ],
      category: 'performance'
    },
    {
      name: 'settings.features.testing.name',
      icon: 'verified',
      description: 'settings.features.testing.description',
      technologies: ['Jest', 'Cypress', 'Testing Library', 'Component Testing'],
      highlights: [
        'Unit test coverage',
        'E2E test automation',
        'Component isolation',
        'CI/CD integration'
      ],
      category: 'technical'
    },
    {
      name: 'settings.features.deployment.name',
      icon: 'cloud_upload',
      description: 'settings.features.deployment.description',
      technologies: ['GitHub Pages', 'Angular CLI', 'CI/CD', 'Static Hosting'],
      highlights: [
        'Automated deployment',
        'GitHub Actions integration',
        'Static site generation',
        'CDN optimization'
      ],
      category: 'performance'
    }
  ];

  technicalImplementations: TechnicalImplementation[] = [
    {
      category: 'Architecture & Design Patterns',
      icon: 'architecture',
      items: [
        {
          name: 'Standalone Components',
          description: 'Modern Angular architecture with standalone components eliminating the need for NgModules',
          technologies: ['Angular 20', 'Standalone API', 'Tree Shaking']
        },
        {
          name: 'Lazy Loading Strategy',
          description: 'Route-based code splitting for optimal performance and loading times',
          technologies: ['Angular Router', 'Dynamic Imports', 'Bundle Optimization']
        },
        {
          name: 'Service-Based Architecture',
          description: 'Clean separation of concerns with injectable services for state management',
          technologies: ['Dependency Injection', 'RxJS', 'Singleton Services']
        }
      ]
    },
    {
      category: 'State Management & Data Flow',
      icon: 'data_usage',
      items: [
        {
          name: 'Reactive Programming',
          description: 'RxJS-based reactive data flow with observables and operators',
          technologies: ['RxJS', 'Observables', 'Operators', 'Async Pipe']
        },
        {
          name: 'Signal-Based Reactivity',
          description: 'Modern Angular Signals for efficient change detection and state management',
          technologies: ['Angular Signals', 'Computed Values', 'Effect Functions']
        },
        {
          name: 'HTTP Client Integration',
          description: 'Robust API integration with error handling and retry mechanisms',
          technologies: ['HTTP Client', 'Interceptors', 'Error Handling', 'Retry Logic']
        }
      ]
    },
    {
      category: 'UI/UX Implementation',
      icon: 'design_services',
      items: [
        {
          name: 'Material Design System',
          description: 'Comprehensive UI component library with consistent design language',
          technologies: ['Angular Material', 'CDK', 'Theming', 'Accessibility']
        },
        {
          name: 'Responsive Design',
          description: 'Mobile-first responsive design with CSS Grid and Flexbox',
          technologies: ['CSS Grid', 'Flexbox', 'Media Queries', 'Viewport Units']
        },
        {
          name: 'Animation & Transitions',
          description: 'Smooth animations and transitions for enhanced user experience',
          technologies: ['Angular Animations', 'CSS Transitions', 'Keyframes']
        }
      ]
    },
    {
      category: 'Developer Experience',
      icon: 'developer_mode',
      items: [
        {
          name: 'TypeScript Integration',
          description: 'Full TypeScript implementation with strict type checking',
          technologies: ['TypeScript', 'Type Guards', 'Interfaces', 'Generics']
        },
        {
          name: 'Testing Strategy',
          description: 'Comprehensive testing approach with unit and E2E tests',
          technologies: ['Jest', 'Cypress', 'Testing Library', 'Test Utilities']
        },
        {
          name: 'Build & Deployment',
          description: 'Automated build pipeline with continuous deployment',
          technologies: ['Angular CLI', 'GitHub Actions', 'Static Hosting', 'CDN']
        }
      ]
    }
  ];

  getCategoryColor(category: string): string {
    const colors = {
      'core': 'primary',
      'technical': 'accent',
      'user-experience': 'warn',
      'performance': 'primary'
    };
    return colors[category as keyof typeof colors] || 'primary';
  }

  getFeaturesByCategory(category: string): AppFeature[] {
    return this.appFeatures.filter(feature => feature.category === category);
  }

  exportSettings(): void {
    const settings = {
      theme: this.themeService.isDarkMode() ? 'dark' : 'light',
      language: this.languageService.language(),
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  resetSettings(): void {
    this.themeService.setTheme('light');
    this.languageService.setLanguage('en');
  }

  openGitHub(): void {
    window.open('https://github.com/sebarubiop/angular-my-portfolio', '_blank', 'noopener,noreferrer');
  }

  openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/sebastian-rubio', '_blank', 'noopener,noreferrer');
  }
} 