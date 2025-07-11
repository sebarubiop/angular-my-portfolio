import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

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
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  constructor(private dialog: MatDialog) {}

  allProjects = [
    {
      title: 'E-Commerce Platform',
      category: 'Full Stack',
      description: 'Modern e-commerce solution with real-time inventory, payment integration, and admin dashboard.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
      features: [
        'Real-time inventory management',
        'Secure payment processing',
        'Advanced search and filtering',
        'Responsive design',
        'Admin dashboard'
      ],
      liveUrl: 'https://ecommerce-demo.com',
      githubUrl: 'https://github.com/sebastianrubio/ecommerce-platform'
    },
    {
      title: 'Task Management App',
      category: 'Frontend',
      description: 'Collaborative project management tool with real-time updates and team features.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
      features: [
        'Real-time collaboration',
        'Drag & drop interface',
        'Time tracking',
        'Team management',
        'Progress analytics'
      ],
      liveUrl: 'https://taskmanager-demo.com',
      githubUrl: 'https://github.com/sebastianrubio/task-manager'
    },
    {
      title: 'Analytics Dashboard',
      category: 'Data Visualization',
      description: 'Interactive dashboard for business analytics with real-time data visualization.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['Angular', 'D3.js', 'Chart.js', 'Express.js'],
      features: [
        'Interactive charts',
        'Real-time data updates',
        'Custom reports',
        'Data export',
        'Multi-tenant support'
      ],
      liveUrl: 'https://analytics-demo.com',
      githubUrl: 'https://github.com/sebastianrubio/analytics-dashboard'
    },
    {
      title: 'Social Media App',
      category: 'Mobile',
      description: 'Progressive web app for social networking with offline capabilities.',
      image: 'https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['React', 'PWA', 'Service Workers', 'IndexedDB'],
      features: [
        'Offline functionality',
        'Push notifications',
        'Image compression',
        'Social sharing',
        'Progressive enhancement'
      ],
      liveUrl: 'https://social-demo.com',
      githubUrl: 'https://github.com/sebastianrubio/social-pwa'
    }
  ];

  featuredProjects = [
    {
      title: 'Enterprise CRM System',
      description: 'Comprehensive customer relationship management system built for enterprise clients with advanced features and scalability.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      highlights: [
        'Handles 10,000+ concurrent users',
        'Advanced reporting and analytics',
        'Role-based access control',
        'Integration with third-party APIs',
        'Automated workflow management'
      ],
      liveUrl: 'https://crm-enterprise.com',
      githubUrl: 'https://github.com/sebastianrubio/enterprise-crm'
    },
    {
      title: 'FinTech Investment Platform',
      description: 'Secure investment platform with real-time market data, portfolio management, and automated trading capabilities.',
      image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      technologies: ['React', 'TypeScript', 'WebSocket', 'AWS', 'Blockchain'],
      highlights: [
        'Real-time market data streaming',
        'Automated trading algorithms',
        'Secure wallet integration',
        'Compliance with financial regulations',
        'Advanced portfolio analytics'
      ],
      liveUrl: 'https://fintech-platform.com',
      githubUrl: 'https://github.com/sebastianrubio/fintech-platform'
    }
  ];

  openSourceProjects = [
    {
      title: 'Angular Material Extensions',
      type: 'Library',
      description: 'Extended components for Angular Material with additional functionality and customization options.',
      icon: 'extension',
      stars: '2.3k',
      forks: '421',
      technologies: ['Angular', 'TypeScript', 'CSS'],
      contribution: 'Created custom date range picker, enhanced data table with virtual scrolling, and improved accessibility features.'
    },
    {
      title: 'React Hook Collection',
      type: 'Utility Library',
      description: 'Collection of custom React hooks for common use cases in modern web applications.',
      icon: 'hooks',
      stars: '1.8k',
      forks: '203',
      technologies: ['React', 'TypeScript', 'Jest'],
      contribution: 'Contributed hooks for form validation, data fetching, local storage management, and performance optimization.'
    },
    {
      title: 'DevOps Automation Scripts',
      type: 'Tools',
      description: 'Collection of scripts for automating deployment, monitoring, and maintenance tasks.',
      icon: 'automation',
      stars: '892',
      forks: '156',
      technologies: ['Node.js', 'Shell', 'Docker', 'AWS'],
      contribution: 'Developed automated deployment pipelines, monitoring scripts, and database backup solutions.'
    }
  ];

  openProjectDetails(project: any): void {
    // Implementation for opening project details modal
    console.log('Opening project details for:', project.title);
  }
}