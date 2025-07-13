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
      title: 'XPO Logistics LTL Platform',
      category: 'Enterprise Frontend',
      description: 'Main customer-facing application for XPO Logistics LTL services. Built high-performance UIs using Angular 8-15 with ag-Grid and Angular Material.',
      image: 'https://images.pexels.com/photos/4481530/pexels-photo-4481530.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['Angular', 'TypeScript', 'ag-Grid', 'Angular Material', 'RxJS', 'NgRx'],
      features: [
        'Scalable micro-frontend architecture',
        'RESTful API integration',
        'Real-time shipment tracking',
        'Advanced data grids',
        'Responsive design for mobile and desktop'
      ],
      liveUrl: 'https://ext-web.ltl-xpo.com/',
      workExperience: 'Perficient (XPO Logistics)'
    },
    {
      title: 'myHotel Fidelity Suite',
      category: 'Hospitality Platform',
      description: 'Customer engagement platform for the hospitality industry using Angular 8/11 and React.js with Redux state management.',
      image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['Angular', 'React.js', 'Redux', 'Node.js', 'AWS S3', 'API Gateway', 'Lambda'],
      features: [
        'Customer engagement tools',
        'AWS cloud integration',
        'Real-time notifications',
        'Seamless data exchange',
        'Mobile-responsive interface'
      ],
      liveUrl: 'https://fidelity.myhotel.cl/',
      workExperience: 'myHotel (Fidelity Suite)'
    },
    {
      title: 'Smartraining E-Learning Platform',
      category: 'Educational Technology',
      description: 'Comprehensive e-learning platform built with MEAN Stack, featuring interactive content delivery and progress tracking.',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['MEAN Stack', 'Angular', 'Node.js', 'MongoDB', 'Express', 'Ionic 5', 'React.js'],
      features: [
        'Interactive learning modules',
        'Progress tracking and analytics',
        'Mobile learning app',
        'Real-time collaboration',
        'Content management system'
      ],
      liveUrl: 'https://smartraining.io/',
      workExperience: 'Smartraining'
    },
    {
      title: 'Hazloxmi Service Marketplace',
      category: 'Marketplace Platform',
      description: 'Chile\'s Airtasker-style service marketplace built with Angular Universal, NGXS, and real-time features.',
      image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['Angular Universal', 'NGXS', 'React.js', 'Redux', 'Socket.io', 'MongoDB'],
      features: [
        'Service provider matching',
        'Real-time messaging',
        'Payment integration',
        'Rating and review system',
        'Geolocation services'
      ],
      workExperience: 'Hazloxmi'
    },
    {
      title: 'Excite Holidays Booking System',
      category: 'Travel & Tourism',
      description: 'Online travel agency booking platform with Angular 7, featuring comprehensive travel booking capabilities.',
      image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['Angular 7', 'TypeScript', 'AWS S3', 'Jenkins', 'Node.js'],
      features: [
        'Multi-service booking system',
        'Payment gateway integration',
        'Itinerary management',
        'Customer portal',
        'Administrative dashboard'
      ],
      workExperience: 'Excite Holidays'
    },
    {
      title: 'Optica Group Finance App',
      category: 'Financial Technology',
      description: 'Mobile-first financial application built with Ionic 3, featuring comprehensive testing with Karma/Jasmine.',
      image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['Ionic 3', 'Angular', 'TypeScript', 'Karma', 'Jasmine'],
      features: [
        'Mobile-first design',
        'Secure financial transactions',
        'Cross-platform compatibility',
        'Comprehensive test coverage',
        'Offline functionality'
      ],
      workExperience: 'Optica Group'
    },
    {
      title: 'Blogotrip Travel Planner',
      category: 'Travel Technology',
      description: 'Tourism itinerary planning platform using AngularJS 1.x with comprehensive travel planning features.',
      image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      technologies: ['AngularJS 1.x', 'MongoDB', 'Node.js', 'Amazon S3'],
      features: [
        'Interactive itinerary builder',
        'Travel recommendations',
        'Social sharing features',
        'Offline map access',
        'Multi-language support'
      ],
      workExperience: 'Blogotrip'
    }
  ];

  featuredProjects = [
    {
      title: 'XPO Logistics LTL Platform',
      description: 'Lead developer on ext-web.ltl-xpo.com, the main LTL customer-facing application for XPO Logistics. Built high-performance UIs using Angular 8-15, ag-Grid, and Angular Material.',
      image: 'https://images.pexels.com/photos/4481530/pexels-photo-4481530.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      technologies: ['Angular', 'TypeScript', 'ag-Grid', 'Angular Material', 'RxJS', 'NgRx', 'SCSS'],
      highlights: [
        'Designed scalable micro-frontend modules integrated with RESTful APIs',
        'Developed internal applications for sales operations and shipment management',
        'Ensured responsive, maintainable UIs and robust state management',
        'Managed projects via TypeScript, RxJS, and NgRx in Agile environments',
        'Implemented advanced data grids for complex logistics operations'
      ],
      liveUrl: 'https://ext-web.ltl-xpo.com/',
      workExperience: 'Perficient (XPO Logistics) - May 2021 to May 2025'
    },
    {
      title: 'myHotel Fidelity Suite',
      description: 'Enhanced customer engagement platform for the hospitality industry using Angular 8/11 and React.js. Part of the comprehensive Fidelity MAiS hospitality management system providing end-to-end hotel operations solutions.',
      image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      technologies: ['Angular', 'React.js', 'Redux', 'Node.js', 'AWS S3', 'API Gateway', 'Lambda', 'Bootstrap', 'Angular Material'],
      highlights: [
        'Integrated UI components with Node.js, AWS S3, API Gateway, and Lambda',
        'Achieved seamless data exchange between frontend and backend systems',
        'Implemented modern UI patterns with Angular Material and Bootstrap',
        'Delivered responsive solutions for hospitality industry clients',
        'Enhanced guest loyalty management and property management features'
      ],
      liveUrl: 'https://fidelity.myhotel.cl/',
      workExperience: 'myHotel (Fidelity Suite) - Dec 2020 to May 2021'
    },
    {
      title: 'Hazloxmi Service Marketplace',
      description: 'Built Chile\'s Airtasker-style platform using Angular Universal, NGXS, and MEAN stack with real-time features and comprehensive marketplace functionality.',
      image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      technologies: ['Angular Universal', 'NGXS', 'React.js', 'Redux', 'Socket.io', 'MongoDB', 'Express'],
      highlights: [
        'Developed cutting-edge marketplace apps with React.js and Redux',
        'Integrated real-time features via Socket.io, Cloudflare, and Cloudinary',
        'Implemented advanced search and matching algorithms',
        'Created scalable service marketplace architecture',
        'Built comprehensive rating and review system'
      ],
      workExperience: 'Hazloxmi - Jul 2019 to Jan 2020'
    }
  ];



  openProjectDetails(project: any): void {
    // Implementation for opening project details modal
    console.log('Opening project details for:', project.title);
  }
}