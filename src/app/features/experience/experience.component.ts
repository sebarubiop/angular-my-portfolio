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
      title: 'Senior Front-End Developer',
      company: 'Perficient (Client: XPO Logistics)',
      period: 'May 2021 - May 2025',
      icon: 'work',
      logo: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Lead developer on ext-web.ltl-xpo.com, the main LTL customer-facing app. Built high-performance UIs using Angular 8-15, ag-Grid, and Angular Material.',
      url: 'https://ext-web.ltl-xpo.com/',
      achievements: [
        'Designed scalable micro-frontend modules integrated with RESTful APIs',
        'Developed internal applications for sales operations and shipment management using React.js v14-15 and Redux',
        'Ensured responsive, maintainable UIs and robust state management',
        'Managed projects via TypeScript, RxJS, and NgRx in Agile environments'
      ],
      technologies: ['Angular', 'React.js', 'SCSS', 'Jest', 'Micro-frontend', 'Git', 'JIRA', 'Confluence', 'REST', 'AWS']
    },
    {
      title: 'Senior Front-End Developer',
      company: 'myHotel (Fidelity Suite platform)',
      period: 'Dec 2020 - May 2021',
      icon: 'hotel',
      logo: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Enhanced customer engagement tools in the hospitality industry via Angular 8/11 and React.js - Redux.',
      url: 'https://fidelity.myhotel.cl/',
      achievements: [
        'Integrated UI components with Node.js, AWS S3, API Gateway, and Lambda',
        'Achieved seamless data exchange between frontend and backend systems',
        'Implemented modern UI patterns with Angular Material and Bootstrap',
        'Delivered responsive solutions for hospitality industry clients'
      ],
      technologies: ['Angular', 'React.js', 'Redux', 'Node.js', 'AWS S3', 'API Gateway', 'Lambda', 'Bootstrap', 'Angular Material', 'GitHub', 'TypeScript', 'SCSS']
    },
    {
      title: 'Full-Stack Developer',
      company: 'Smartraining',
      period: 'Feb 2020 - Sep 2020',
      icon: 'school',
      logo: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Developed scalable e-learning products using MEAN Stack (MongoDB, Express, Angular, Node.js), Nest.js, and Ionic 5.',
      url: 'https://smartraining.io/',
      achievements: [
        'Built cutting-edge educational apps with React.js and Redux',
        'Deployed mobile apps and web tools through DigitalOcean',
        'Created comprehensive learning management systems',
        'Implemented real-time features for interactive learning experiences'
      ],
      technologies: ['MEAN Stack', 'MongoDB', 'Express', 'Angular', 'Node.js', 'Nest.js', 'Ionic 5', 'React.js', 'Redux', 'DigitalOcean']
    },
    {
      title: 'Full-Stack Developer',
      company: 'Hazloxmi (Service marketplace)',
      period: 'Jul 2019 - Jan 2020',
      icon: 'store',
      logo: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Built Chile\'s Airtasker-style platform using Angular Universal, NGXS, and MEAN stack (MongoDB, Express, Angular, Node.js).',
      achievements: [
        'Developed cutting-edge marketplace apps with React.js and Redux',
        'Integrated real-time features via Socket.io, Cloudflare, Cloudinary, and Mailgun',
        'Created scalable service marketplace architecture',
        'Implemented advanced search and matching algorithms'
      ],
      technologies: ['Angular Universal', 'NGXS', 'MEAN Stack', 'MongoDB', 'Express', 'Angular', 'Node.js', 'React.js', 'Redux', 'Socket.io', 'Cloudflare', 'Cloudinary', 'Mailgun']
    },
    {
      title: 'Front-End Developer',
      company: 'Excite Holidays (OTA booking system)',
      period: 'Apr 2018 - Apr 2019',
      icon: 'flight',
      logo: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Created responsive booking interfaces using Angular 7, AWS S3, Jenkins, and Node.js for online travel agency.',
      achievements: [
        'Developed user-friendly booking systems for travel industry',
        'Implemented responsive design for mobile and desktop users',
        'Integrated with multiple travel APIs and payment gateways',
        'Optimized performance for high-traffic booking scenarios'
      ],
      technologies: ['Angular 7', 'AWS S3', 'Jenkins', 'Node.js', 'TypeScript', 'SCSS', 'RESTful APIs']
    },
    {
      title: 'Front-End Developer',
      company: 'Optica Group (Finance App)',
      period: 'Sep 2017 - Dec 2017',
      icon: 'account_balance',
      logo: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Developed mobile-first features in Ionic 3, with full testing coverage via Karma/Jasmine for financial applications.',
      achievements: [
        'Created comprehensive test suites with Karma and Jasmine',
        'Implemented mobile-first responsive design principles',
        'Delivered secure financial application features',
        'Ensured cross-platform compatibility and performance'
      ],
      technologies: ['Ionic 3', 'Karma', 'Jasmine', 'TypeScript', 'SCSS', 'Angular']
    },
    {
      title: 'Full-Stack Developer',
      company: 'Blogotrip (Travel itinerary planner)',
      period: 'Aug 2016 - Aug 2017',
      icon: 'map',
      logo: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      description: 'Created tourism itinerary apps using AngularJS 1.x, MongoDB, Node.js, and Amazon S3 for travel planning platform.',
      achievements: [
        'Built comprehensive travel planning and itinerary management system',
        'Integrated with multiple travel APIs and mapping services',
        'Implemented user-generated content and social features',
        'Delivered scalable solution for tourism industry clients'
      ],
      technologies: ['AngularJS 1.x', 'MongoDB', 'Node.js', 'Amazon S3', 'JavaScript', 'HTML5', 'CSS3']
    }
  ];

  skillsEvolution = [
    {
      name: 'Angular',
      years: 9,
      proficiency: 95,
      timeline: [
        { year: '2016', active: true },
        { year: '2017', active: true },
        { year: '2018', active: true },
        { year: '2019', active: true },
        { year: '2020', active: true },
        { year: '2021', active: true },
        { year: '2022', active: true },
        { year: '2023', active: true },
        { year: '2024', active: true }
      ]
    },
    {
      name: 'React',
      years: 6,
      proficiency: 60,
      timeline: [
        { year: '2019', active: true },
        { year: '2020', active: true },
        { year: '2021', active: true },
        { year: '2022', active: true },
        { year: '2023', active: true },
        { year: '2024', active: true }
      ]
    },
    {
      name: 'TypeScript',
      years: 8,
      proficiency: 92,
      timeline: [
        { year: '2017', active: true },
        { year: '2018', active: true },
        { year: '2019', active: true },
        { year: '2020', active: true },
        { year: '2021', active: true },
        { year: '2022', active: true },
        { year: '2023', active: true },
        { year: '2024', active: true }
      ]
    },
    {
      name: 'Node.js',
      years: 9,
      proficiency: 85,
      timeline: [
        { year: '2016', active: true },
        { year: '2017', active: true },
        { year: '2018', active: true },
        { year: '2019', active: true },
        { year: '2020', active: true },
        { year: '2021', active: true },
        { year: '2022', active: true },
        { year: '2023', active: true },
        { year: '2024', active: true }
      ]
    },
    {
      name: 'AWS',
      years: 7,
      proficiency: 80,
      timeline: [
        { year: '2018', active: true },
        { year: '2019', active: true },
        { year: '2020', active: true },
        { year: '2021', active: true },
        { year: '2022', active: true },
        { year: '2023', active: true },
        { year: '2024', active: true }
      ]
    }
  ];

  professionalAchievements = [
    {
      title: 'CISA Certified Information Systems Auditor',
      description: 'Achieved CISA certification from ISACA, demonstrating expertise in IT governance and security.',
      impact: 'Brings unique combination of technical expertise and security awareness to frontend development projects.',
      date: '2012',
      icon: 'verified'
    },
    {
      title: 'BECAS Chile Scholarship',
      description: 'Received prestigious scholarship from the Government of Chile to fund master\'s degree studies abroad.',
      impact: 'Enabled advanced education at The University of Sydney, leading to enhanced technical leadership and international perspective.',
      date: '2015',
      icon: 'emoji_events'
    },
    {
      title: 'International Experience Leadership',
      description: 'Led development teams across three countries: Chile, Australia, and the United States.',
      impact: 'Delivered successful projects in diverse cultural and business environments, adapting to different industry requirements.',
      date: '2016-2025',
      icon: 'public'
    },
    {
      title: 'Master\'s Degree Achievement',
      description: 'Completed MIT/MITM Combined Master\'s Degree in Engineering & IT at University of Sydney.',
      impact: 'Advanced technical knowledge and strategic thinking capabilities that enhance project leadership and technical decision-making.',
      date: '2016',
      icon: 'school'
    }
  ];

  skillCategories = [
    {
      name: 'Frontend Technologies',
      skills: [
        { name: 'Angular (2-15)', level: 95 },
        { name: 'React.js', level: 60 },
        { name: 'TypeScript', level: 92 },
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'HTML5/CSS3/SCSS', level: 98 },
        { name: 'Angular Material', level: 90 },
        { name: 'Bootstrap', level: 85 }
      ]
    },
    {
      name: 'Backend & Architecture',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 82 },
        { name: 'Nest.js', level: 80 },
        { name: 'MongoDB', level: 78 },
        { name: 'MySQL', level: 75 },
        { name: 'RESTful APIs', level: 88 },
        { name: 'Micro-Frontend Architecture', level: 85 }
      ]
    },
    {
      name: 'Cloud & DevOps',
      skills: [
        { name: 'AWS (S3, Lambda, API Gateway)', level: 80 },
        { name: 'Git/GitHub', level: 92 },
        { name: 'Jenkins', level: 75 },
        { name: 'Jest/Cypress', level: 85 },
        { name: 'Karma/Jasmine', level: 80 },
        { name: 'JIRA/Confluence', level: 85 },
        { name: 'Redux/RxJS/NgRx', level: 88 }
      ]
    }
  ];

  ngOnInit(): void {
    // Initialize component
  }
}