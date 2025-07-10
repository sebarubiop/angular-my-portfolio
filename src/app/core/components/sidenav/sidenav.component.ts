import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver } from '@angular/cdk/layout';

interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="sidenav-content">
      <div class="profile-section">
        <div class="profile-avatar">
          <img 
            src="https://res.cloudinary.com/dr0a1g6rs/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1752130331/myface_ldvrx6.jpg" 
            alt="Sebastian Rubio"
            loading="lazy">
        </div>
        <h3 class="profile-name">Sebastian Rubio</h3>
        <p class="profile-role">Senior Frontend Developer</p>
        <p class="profile-experience">8+ Years Experience</p>
      </div>
      
      <mat-divider></mat-divider>
      
      <nav class="navigation">
        <mat-nav-list>
          <a 
            *ngFor="let item of navigationItems"
            mat-list-item 
            [routerLink]="item.route"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: item.route === '/' }"
            (click)="onNavigate()"
            class="nav-item">
            <mat-icon matListItemIcon class="nav-icon">{{ item.icon }}</mat-icon>
            <div matListItemTitle class="nav-title">{{ item.label }}</div>
            <div matListItemLine class="nav-description">{{ item.description }}</div>
          </a>
        </mat-nav-list>
      </nav>
      
      <div class="sidenav-footer">
        <mat-divider></mat-divider>
        <div class="footer-content">
          <p class="footer-text">Built with Angular 20</p>
          <p class="footer-text">© 2025 Sebastian Rubio</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sidenav-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: var(--surface-color);
    }

    .profile-section {
      padding: 24px;
      text-align: center;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: var(--on-primary-color);
    }

    .profile-avatar {
      width: 80px;
      height: 80px;
      margin: 0 auto 16px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .profile-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-name {
      margin: 0 0 8px;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .profile-role {
      margin: 0 0 4px;
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .profile-experience {
      margin: 0;
      font-size: 0.75rem;
      opacity: 0.8;
    }

    .navigation {
      flex: 1;
      overflow-y: auto;
    }

    .nav-item {
      transition: all 0.3s ease;
      border-radius: 0 24px 24px 0;
      margin: 4px 12px 4px 0;
      color: var(--on-surface-color);
    }

    .nav-item:hover {
      background-color: var(--primary-color-light);
      color: var(--primary-color);
    }

    .nav-item.active {
      background-color: var(--primary-color);
      color: var(--on-primary-color);
    }

    .nav-icon {
      color: inherit;
      transition: transform 0.3s ease;
    }

    .nav-item:hover .nav-icon {
      transform: scale(1.1);
    }

    .nav-title {
      font-weight: 500;
      font-size: 0.875rem;
    }

    .nav-description {
      font-size: 0.75rem;
      opacity: 0.7;
      margin-top: 2px;
    }

    .sidenav-footer {
      margin-top: auto;
    }

    .footer-content {
      padding: 16px 24px;
      text-align: center;
    }

    .footer-text {
      margin: 4px 0;
      font-size: 0.75rem;
      color: var(--on-surface-variant-color);
    }

    @media (max-width: 768px) {
      .profile-section {
        padding: 16px;
      }
      
      .profile-avatar {
        width: 60px;
        height: 60px;
      }
      
      .profile-name {
        font-size: 1.125rem;
      }
    }
  `]
})
export class SidenavComponent {
  @Output() closeSidenav = new EventEmitter<void>();
  
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  navigationItems: NavigationItem[] = [
    {
      label: 'Home',
      route: '/',
      icon: 'home',
      description: 'Welcome & Overview'
    },
    {
      label: 'About',
      route: '/about',
      icon: 'person',
      description: 'Background & Skills'
    },
    {
      label: 'Experience',
      route: '/experience',
      icon: 'work',
      description: 'Career Journey'
    },
    {
      label: 'Projects',
      route: '/projects',
      icon: 'code',
      description: 'Portfolio & Work'
    },
    {
      label: 'Contact',
      route: '/contact',
      icon: 'contact_mail',
      description: 'Get In Touch'
    },
    {
      label: 'Sandbox',
      route: '/sandbox',
      icon: 'science',
      description: 'Component Demo'
    }
  ];

  onNavigate(): void {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.closeSidenav.emit();
    }
  }
}