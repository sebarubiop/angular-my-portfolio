import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';

interface NavigationItem {
  labelKey: string;
  route: string;
  icon: string;
  descriptionKey: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    TranslateModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Output() closeSidenav = new EventEmitter<void>();
  
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  navigationItems: NavigationItem[] = [
    {
      labelKey: 'nav.home',
      route: '/',
      icon: 'home',
      descriptionKey: 'sidenav.home_description'
    },
    {
      labelKey: 'nav.about',
      route: '/about',
      icon: 'person',
      descriptionKey: 'sidenav.about_description'
    },
    {
      labelKey: 'nav.experience',
      route: '/experience',
      icon: 'work',
      descriptionKey: 'sidenav.experience_description'
    },
    {
      labelKey: 'nav.projects',
      route: '/projects',
      icon: 'code',
      descriptionKey: 'sidenav.projects_description'
    },
    {
      labelKey: 'nav.contact',
      route: '/contact',
      icon: 'contact_mail',
      descriptionKey: 'sidenav.contact_description'
    },
    {
      labelKey: 'nav.sandbox',
      route: '/sandbox',
      icon: 'code',
      descriptionKey: 'sidenav.sandbox_description'
    },
    {
      labelKey: 'nav.settings',
      route: '/settings',
      icon: 'settings',
      descriptionKey: 'sidenav.settings_description'
    }
  ];

  onNavigate(): void {
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.closeSidenav.emit();
    }
  }
}