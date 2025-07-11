import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  technologies = [
    { name: 'Angular', icon: 'web' },
    { name: 'React', icon: 'web' },
    { name: 'TypeScript', icon: 'code' },
    { name: 'Node.js', icon: 'dns' },
    { name: 'Firebase', icon: 'cloud' },
    { name: 'Material Design', icon: 'palette' },
    { name: 'RxJS', icon: 'stream' },
    { name: 'Jest', icon: 'verified' },
    { name: 'Cypress', icon: 'bug_report' },
    { name: 'Git', icon: 'merge_type' },
    { name: 'Docker', icon: 'docker' },
    { name: 'AWS', icon: 'cloud_queue' }
  ];

  stats = [
    { icon: 'work', number: '8+', labelKey: 'home.stats.years_experience' },
    { icon: 'code', number: '50+', labelKey: 'home.stats.projects_completed' },
    { icon: 'business', number: '15+', labelKey: 'home.stats.clients_served' },
    { icon: 'star', number: '4.9', labelKey: 'home.stats.client_rating' }
  ];

  featuredProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution built with Angular and Node.js',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io']
    },
    {
      title: 'Financial Dashboard',
      description: 'Data visualization dashboard for financial analytics',
      image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      technologies: ['Angular', 'D3.js', 'Chart.js', 'RxJS']
    }
  ];
}