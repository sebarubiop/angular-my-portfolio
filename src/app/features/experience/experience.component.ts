import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    TranslateModule
  ],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  
  workExperience = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      period: '2020 - Present',
      icon: 'work',
      logo: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Leading frontend development for enterprise web applications, managing a team of 5 developers, and implementing modern web technologies.',
      achievements: [
        'Increased application performance by 40% through optimization strategies',
        'Led migration from AngularJS to Angular 15, reducing technical debt',
        'Implemented comprehensive testing strategy, achieving 85% code coverage',
        'Mentored 3 junior developers and established code review processes'
      ],
      technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Material Design', 'Jest', 'Cypress']
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupTech Inc.',
      period: '2018 - 2020',
      icon: 'code',
      logo: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Developed and maintained multiple web applications using modern JavaScript frameworks and backend technologies.',
      achievements: [
        'Built 3 production applications from scratch serving 10,000+ users',
        'Implemented real-time features using WebSocket connections',
        'Optimized database queries, reducing load times by 60%',
        'Integrated third-party APIs and payment systems'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'AWS', 'Docker']
    },
    {
      title: 'Frontend Developer',
      company: 'WebDesign Studio',
      period: '2016 - 2018',
      icon: 'web',
      logo: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Created responsive websites and web applications for various clients, focusing on user experience and performance.',
      achievements: [
        'Delivered 15+ client projects with 100% satisfaction rate',
        'Reduced average page load time by 50% across all projects',
        'Implemented responsive design principles for mobile-first approach',
        'Collaborated with designers to create pixel-perfect implementations'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'Sass', 'Gulp']
    }
  ];

  skillsEvolution = [
    {
      name: 'Angular',
      years: 6,
      proficiency: 95,
      timeline: [
        { year: '2018', active: true },
        { year: '2019', active: true },
        { year: '2020', active: true },
        { year: '2021', active: true },
        { year: '2022', active: true },
        { year: '2023', active: true }
      ]
    },
    {
      name: 'React',
      years: 5,
      proficiency: 90,
      timeline: [
        { year: '2019', active: true },
        { year: '2020', active: true },
        { year: '2021', active: true },
        { year: '2022', active: true },
        { year: '2023', active: true }
      ]
    },
    {
      name: 'TypeScript',
      years: 4,
      proficiency: 88,
      timeline: [
        { year: '2020', active: true },
        { year: '2021', active: true },
        { year: '2022', active: true },
        { year: '2023', active: true }
      ]
    },
    {
      name: 'Node.js',
      years: 5,
      proficiency: 82,
      timeline: [
        { year: '2019', active: true },
        { year: '2020', active: true },
        { year: '2021', active: true },
        { year: '2022', active: true },
        { year: '2023', active: true }
      ]
    }
  ];

  professionalAchievements = [
    {
      title: 'Technical Leadership Award',
      description: 'Recognized for outstanding technical leadership and mentorship contributions.',
      impact: 'Successfully led a team of 5 developers through a major platform migration, resulting in improved performance and maintainability.',
      date: '2023',
      icon: 'emoji_events'
    },
    {
      title: 'Innovation in Development',
      description: 'Awarded for implementing cutting-edge development practices and tools.',
      impact: 'Introduced automated testing and CI/CD pipelines, reducing deployment time by 70% and bug reports by 50%.',
      date: '2022',
      icon: 'lightbulb'
    },
    {
      title: 'Client Excellence Award',
      description: 'Received for consistently delivering high-quality solutions that exceed client expectations.',
      impact: 'Maintained a 98% client satisfaction rate across 20+ projects, leading to 60% increase in repeat business.',
      date: '2021',
      icon: 'star'
    },
    {
      title: 'Community Contributor',
      description: 'Recognized for active participation in open-source projects and developer community.',
      impact: 'Contributed to 15+ open-source projects with over 5,000 GitHub stars collectively, helping thousands of developers worldwide.',
      date: '2020',
      icon: 'group'
    }
  ];

  skillCategories = [
    {
      name: 'Frontend Technologies',
      skills: [
        { name: 'Angular', level: 95 },
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'JavaScript', level: 92 },
        { name: 'HTML5/CSS3', level: 95 }
      ]
    },
    {
      name: 'Backend & Database',
      skills: [
        { name: 'Node.js', level: 82 },
        { name: 'Express.js', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'GraphQL', level: 65 }
      ]
    },
    {
      name: 'Tools & DevOps',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'Jest/Cypress', level: 85 },
        { name: 'Webpack', level: 80 }
      ]
    }
  ];

  ngOnInit(): void {
    // Initialize component
  }
}