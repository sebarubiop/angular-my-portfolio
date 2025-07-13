import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent {
  skillCategories = [
    {
      nameKey: 'about.skills.frontend',
      icon: 'web',
      skills: [
        { name: 'Angular (2-15+)', level: 95 },
        { name: 'React.js', level: 60 },
        { name: 'TypeScript', level: 92 },
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'HTML5', level: 98 },
        { name: 'CSS3/SCSS', level: 95 },
        { name: 'Angular Material', level: 90 },
        { name: 'Bootstrap', level: 85 },
        { name: 'Ionic', level: 80 }
      ]
    },
    {
      nameKey: 'about.skills.backend',
      icon: 'dns',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 82 },
        { name: 'Nest.js', level: 80 },
        { name: 'RESTful APIs', level: 88 },
        { name: 'MongoDB', level: 78 },
        { name: 'MySQL', level: 75 },
        { name: 'Socket.io', level: 75 },
        { name: 'Micro-Frontend Architecture', level: 75 }
      ]
    },
    {
      nameKey: 'about.skills.tools',
      icon: 'build',
      skills: [
        { name: 'AWS (S3, Lambda, API Gateway)', level: 80 },
        { name: 'Git/GitHub', level: 92 },
        { name: 'Jest/Cypress', level: 85 },
        { name: 'Karma/Jasmine', level: 80 },
        { name: 'Jenkins', level: 75 },
        { name: 'JIRA/Confluence', level: 85 },
        { name: 'Redux/RxJS/NgRx', level: 80 }
      ]
    }
  ];

  education = [
    {
      icon: 'school',
      title: 'MIT/MITM Combined Master\'s Degree in Engineering & IT',
      institution: 'The University of Sydney',
      year: '2015 - 2016',
      description: 'Master\'s degree in Engineering & IT with focus on advanced software engineering and technology management.'
    },
    {
      icon: 'school',
      title: 'Bachelor of Computer and Informatics Engineering',
      institution: 'University of Santiago of Chile',
      year: '2005 - 2009',
      description: 'Bachelor\'s degree in Computer and Informatics Engineering with comprehensive foundation in software development.'
    },
    {
      icon: 'verified',
      title: 'CISA Certified Information Systems Auditor',
      institution: 'ISACA',
      year: 'Since 2012',
      description: 'Certified Information Systems Auditor specializing in IT governance, risk management, and security.'
    },
    {
      icon: 'verified',
      title: 'BECAS Chile Scholarship',
      institution: 'Government of Chile',
      year: '2015',
      description: 'Funded full master\'s degree abroad scholarship for studies at The University of Sydney.'
    },
    {
      icon: 'rocket_launch',
      title: 'INCUBATE Startup Accelerator',
      institution: 'The University of Sydney',
      year: '2017',
      description: 'Participated in startup accelerator program focusing on technology entrepreneurship.'
    },
    {
      icon: 'school',
      title: 'Summer Scholarship 2017',
      institution: 'The University of Sydney',
      year: '2017',
      description: 'Merit-based scholarship awarded for academic excellence and research potential.'
    }
  ];

  interests = [
    {
      icon: 'school',
      titleKey: 'about.interests.mentoring',
      descriptionKey: 'about.interests.mentoring_desc'
    },
    {
      icon: 'sports_soccer',
      titleKey: 'about.interests.latin_dance',
      descriptionKey: 'about.interests.latin_dance_desc'
    },
    {
      icon: 'hiking',
      titleKey: 'about.interests.traveling',
      descriptionKey: 'about.interests.traveling_desc'
    },
    {
      icon: 'fitness_center',
      titleKey: 'about.interests.fitness',
      descriptionKey: 'about.interests.fitness_desc'
    }
  ];

  values = [
    {
      icon: 'lightbulb',
      titleKey: 'about.values.innovation',
      descriptionKey: 'about.values.innovation_desc'
    },
    {
      icon: 'groups',
      titleKey: 'about.values.collaboration',
      descriptionKey: 'about.values.collaboration_desc'
    },
    {
      icon: 'psychology',
      titleKey: 'about.values.learning',
      descriptionKey: 'about.values.learning_desc'
    },
    {
      icon: 'star',
      titleKey: 'about.values.quality',
      descriptionKey: 'about.values.quality_desc'
    }
  ];
}