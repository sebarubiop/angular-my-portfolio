import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  template: `
    <mat-toolbar class="header-toolbar">
      <button 
        *ngIf="showMenuButton"
        mat-icon-button 
        (click)="menuClick.emit()"
        class="menu-button"
        aria-label="Toggle menu">
        <mat-icon>menu</mat-icon>
      </button>
      
      <div class="header-content">
        <h1 class="header-title">Sebastian Rubio</h1>
        <span class="header-subtitle">Frontend Developer</span>
      </div>
      
      <div class="header-actions">
        <!-- Language Selector -->
        <button 
          mat-icon-button 
          [matMenuTriggerFor]="languageMenu"
          class="action-button"
          [matTooltip]="'Select Language'">
          <span class="flag-icon">{{ languageService.getCurrentLanguageConfig().flag }}</span>
        </button>
        <mat-menu #languageMenu="matMenu">
          <button 
            *ngFor="let lang of languageService.availableLanguages"
            mat-menu-item 
            (click)="languageService.setLanguage(lang.code)"
            [class.active]="languageService.language() === lang.code">
            <span class="flag-icon">{{ lang.flag }}</span>
            <span>{{ lang.name }}</span>
          </button>
        </mat-menu>
        
        <!-- Theme Toggle -->
        <button 
          mat-icon-button 
          (click)="themeService.toggleTheme()"
          class="action-button theme-toggle"
          [matTooltip]="themeService.isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
          <mat-icon>{{ themeService.isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header-toolbar {
      background-color: var(--surface-color);
      color: var(--on-surface-color);
      border-bottom: 1px solid var(--border-color);
      transition: all 0.3s ease;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .menu-button {
      margin-right: 16px;
      color: var(--primary-color);
    }

    .header-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .header-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary-color);
      line-height: 1.2;
    }

    .header-subtitle {
      font-size: 0.875rem;
      color: var(--on-surface-variant-color);
      margin-top: -2px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .action-button {
      color: var(--on-surface-color);
      transition: all 0.3s ease;
    }

    .action-button:hover {
      color: var(--primary-color);
      transform: scale(1.1);
    }

    .theme-toggle {
      animation: none;
    }

    .theme-toggle:hover {
      animation: spin 0.3s ease-in-out;
    }

    .flag-icon {
      font-size: 1.2rem;
      line-height: 1;
    }

    .active {
      background-color: var(--primary-color);
      color: var(--on-primary-color);
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(180deg); }
    }

    @media (max-width: 768px) {
      .header-title {
        font-size: 1.25rem;
      }
      
      .header-subtitle {
        font-size: 0.75rem;
      }
      
      .header-actions {
        gap: 4px;
      }
    }
  `]
})
export class HeaderComponent {
  @Input() showMenuButton = false;
  @Output() menuClick = new EventEmitter<void>();
  
  themeService = inject(ThemeService);
  languageService = inject(LanguageService);
}