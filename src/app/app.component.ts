import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

import { ThemeService } from './core/services/theme.service';
import { LanguageService } from './core/services/language.service';
import { HeaderComponent } from './core/components/header/header.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    SidenavComponent
  ],
  template: `
    <div class="app-container" [class.dark-theme]="themeService.isDarkMode()">
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav 
          #drawer 
          class="sidenav" 
          [mode]="isHandset() ? 'over' : 'side'"
          [opened]="!isHandset()"
          [fixedInViewport]="isHandset()"
          fixedTopGap="64">
          <app-sidenav (closeSidenav)="drawer.close()"></app-sidenav>
        </mat-sidenav>
        
        <mat-sidenav-content>
          <app-header 
            (menuClick)="drawer.toggle()"
            [showMenuButton]="isHandset()">
          </app-header>
          
          <main class="main-content" [class.with-sidenav]="!isHandset()">
            <router-outlet></router-outlet>
          </main>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      transition: background-color 0.3s ease;
    }

    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 280px;
      background-color: var(--surface-color);
      border-right: 1px solid var(--border-color);
    }

    .main-content {
      padding: 24px;
      transition: margin-left 0.3s ease;
      min-height: calc(100vh - 64px);
      background-color: var(--background-color);
    }

    .main-content.with-sidenav {
      margin-left: 0;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit() {
    this.themeService.initializeTheme();
    this.languageService.initializeLanguage();
  }

  isHandset() {
    return this.breakpointObserver.isMatched('(max-width: 768px)');
  }
}