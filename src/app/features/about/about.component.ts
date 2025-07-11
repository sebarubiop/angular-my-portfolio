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
        { name: 'Angular', level: 95 },
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 92 },
        { name: 'JavaScript', level: 95 },
        { name: 'HTML5', level: 98 },
        { name: 'CSS3/SCSS', level: 95 }
      ]
    },
    {
      nameKey: 'about.skills.backend',
      icon: 'dns',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 82 },
        { name: 'Firebase', level: 88 },
        { name: 'MongoDB', level: 78 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'GraphQL', level: 70 }
      ]
    },
    {
      nameKey: 'about.skills.tools',
      icon: 'build',
      skills: [
        { name: 'Git/GitHub', level: 92 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'Jest/Cypress', level: 85 },
        { name: 'Webpack', level: 80 },
        { name: 'Figma', level: 75 }
      ]
    }
  ];

  education = [
    {
      icon: 'school',
      title: 'Computer Science Degree',
      institution: 'Universidad de Buenos Aires',
      year: '2012 - 2016',
      description: 'Bachelor of Science in Computer Science with focus on software engineering and web technologies.'
    },
    {
      icon: 'verified',
      title: 'Angular Certification',
      institution: 'Google Developers',
      year: '2019',
      description: 'Advanced Angular certification covering enterprise application development and best practices.'
    },
    {
      icon: 'cloud',
      title: 'AWS Solutions Architect',
      institution: 'Amazon Web Services',
      year: '2021',
      description: 'AWS certified solutions architect with expertise in cloud infrastructure and deployment.'
    }
  ];

  interests = [
    {
      icon: 'code',
      titleKey: 'about.interests.open_source',
      descriptionKey: 'about.interests.open_source_desc'
    },
    {
      icon: 'school',
      titleKey: 'about.interests.mentoring',
      descriptionKey: 'about.interests.mentoring_desc'
    },
    {
      icon: 'camera_alt',
      titleKey: 'about.interests.photography',
      descriptionKey: 'about.interests.photography_desc'
    },
    {
      icon: 'hiking',
      titleKey: 'about.interests.traveling',
      descriptionKey: 'about.interests.traveling_desc'
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