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
      title: 'XPO Logistics LTL Platform',
      description: 'Lead developer on ext-web.ltl-xpo.com, the main LTL customer-facing application for XPO Logistics. Built high-performance UIs using Angular 8-15, ag-Grid, and Angular Material.',
      image: 'https://images.pexels.com/photos/4481530/pexels-photo-4481530.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      technologies: ['Angular', 'TypeScript', 'ag-Grid', 'Angular Material', 'RxJS', 'NgRx'],
      liveUrl: 'https://ext-web.ltl-xpo.com/',
      workExperience: 'Perficient (XPO Logistics) - May 2021 to May 2025'
    },
    {
      title: 'myHotel Fidelity Suite',
      description: 'Enhanced customer engagement platform for the hospitality industry using Angular 8/11 and React.js. Part of the comprehensive Fidelity MAiS hospitality management system.',
      image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      technologies: ['Angular', 'React.js', 'Redux', 'Node.js', 'AWS S3', 'API Gateway'],
      liveUrl: 'https://fidelity.myhotel.cl/',
      workExperience: 'myHotel (Fidelity Suite) - Dec 2020 to May 2021'
    },
    {
      title: 'Smartraining E-Learning Platform',
      description: 'Comprehensive e-learning platform built with MEAN Stack, featuring interactive content delivery and progress tracking.',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      technologies: ['MEAN Stack', 'Angular', 'Node.js', 'MongoDB', 'Express', 'Ionic 5'],
      liveUrl: 'https://smartraining.io/',
      workExperience: 'Smartraining'
    }
  ];

  openProjectUrl(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}