import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleFederationStatusService } from '../../core/services/module-federation-status.service';

@Component({
  selector: 'app-module-federation-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="status-container">
      <h3>Module Federation Status</h3>
      
      <div class="status-grid">
        <div class="status-item" [class.active]="status.isEnabled">
          <div class="status-icon">🔧</div>
          <div class="status-content">
            <h4>Module Federation</h4>
            <p>{{ status.isEnabled ? 'Enabled' : 'Disabled' }}</p>
          </div>
        </div>

        <div class="status-item" [class.active]="status.isConnected">
          <div class="status-icon">🔗</div>
          <div class="status-content">
            <h4>Connection</h4>
            <p>{{ status.isConnected ? 'Connected' : 'Disconnected' }}</p>
          </div>
        </div>

        <div class="status-item" [class.active]="status.remotes.length > 0">
          <div class="status-icon">🌐</div>
          <div class="status-content">
            <h4>Remotes</h4>
            <p>{{ status.remotes.length }} configured</p>
          </div>
        </div>

        <div class="status-item" [class.active]="status.sharedDependencies.length > 0">
          <div class="status-icon">📦</div>
          <div class="status-content">
            <h4>Shared Dependencies</h4>
            <p>{{ status.sharedDependencies.length }} shared</p>
          </div>
        </div>
      </div>

      <div class="details-section">
        <h4>Remote Status</h4>
        <div class="remote-list">
          <div 
            *ngFor="let remote of status.remotes" 
            class="remote-item"
            [class.available]="remote.isAvailable">
            <div class="remote-name">{{ remote.name }}</div>
            <div class="remote-status">
              <span class="status-dot" [class.active]="remote.isAvailable"></span>
              {{ remote.isAvailable ? 'Available' : 'Unavailable' }}
            </div>
            <div class="remote-url">{{ remote.url }}</div>
            <div class="remote-time">Last checked: {{ remote.lastChecked | date:'short' }}</div>
          </div>
        </div>
      </div>

      <div class="details-section">
        <h4>Shared Dependencies</h4>
        <div class="dependencies-list">
          <span 
            *ngFor="let dep of status.sharedDependencies" 
            class="dependency-badge">
            {{ dep }}
          </span>
        </div>
      </div>

      <div *ngIf="status.lastError" class="error-section">
        <h4>Last Error</h4>
        <p class="error-message">{{ status.lastError }}</p>
      </div>

      <div class="actions-section">
        <button (click)="refreshStatus()" class="refresh-btn">
          🔄 Refresh Status
        </button>
        <button (click)="simulateRemoteLoad()" class="simulate-btn">
          🎯 Simulate Remote Load
        </button>
      </div>
    </div>
  `,
  styles: [`
    .status-container {
      background: var(--card-bg, #f8f9fa);
      border: 1px solid var(--border-color, #e9ecef);
      border-radius: 12px;
      padding: 24px;
      margin: 20px 0;
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 20px 0;
    }

    .status-item {
      display: flex;
      align-items: center;
      padding: 16px;
      background: var(--surface-bg, #ffffff);
      border: 1px solid var(--border-color, #e9ecef);
      border-radius: 8px;
      transition: all 0.3s ease;

      &.active {
        border-color: var(--success-color, #28a745);
        background: var(--success-bg, #d4edda);
      }
    }

    .status-icon {
      font-size: 24px;
      margin-right: 12px;
    }

    .status-content h4 {
      margin: 0 0 4px 0;
      font-size: 14px;
      font-weight: 600;
    }

    .status-content p {
      margin: 0;
      font-size: 12px;
      color: var(--text-secondary);
    }

    .details-section {
      margin: 24px 0;
      
      h4 {
        margin-bottom: 12px;
        color: var(--primary-color);
      }
    }

    .remote-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .remote-item {
      padding: 12px;
      background: var(--surface-bg, #ffffff);
      border: 1px solid var(--border-color, #e9ecef);
      border-radius: 6px;
      font-size: 12px;

      &.available {
        border-color: var(--success-color, #28a745);
        background: var(--success-bg, #d4edda);
      }
    }

    .remote-name {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .remote-status {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--error-color, #dc3545);

      &.active {
        background: var(--success-color, #28a745);
      }
    }

    .remote-url {
      color: var(--text-secondary);
      font-family: monospace;
      margin-bottom: 4px;
    }

    .remote-time {
      color: var(--text-secondary);
      font-size: 10px;
    }

    .dependencies-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .dependency-badge {
      background: var(--primary-color);
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 500;
    }

    .error-section {
      margin: 20px 0;
      padding: 16px;
      background: var(--error-bg, #f8d7da);
      border: 1px solid var(--error-color, #dc3545);
      border-radius: 6px;
    }

    .error-message {
      color: var(--error-color, #dc3545);
      margin: 0;
      font-family: monospace;
      font-size: 12px;
    }

    .actions-section {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .refresh-btn, .simulate-btn {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      transition: background 0.2s ease;

      &:hover {
        background: var(--primary-dark);
      }
    }

    .simulate-btn {
      background: var(--warning-color, #ffc107);
      color: var(--text-dark, #212529);

      &:hover {
        background: var(--warning-dark, #e0a800);
      }
    }

    @media (max-width: 768px) {
      .status-grid {
        grid-template-columns: 1fr;
      }

      .actions-section {
        flex-direction: column;
      }
    }
  `]
})
export class ModuleFederationStatusComponent implements OnInit {
  status: any = {
    isEnabled: false,
    isConnected: false,
    remotes: [],
    sharedDependencies: [],
    lastError: undefined
  };

  constructor(private moduleFederationStatus: ModuleFederationStatusService) { }

  ngOnInit(): void {
    this.moduleFederationStatus.getStatus().subscribe(status => {
      this.status = status;
    });
  }

  refreshStatus(): void {
    this.moduleFederationStatus.checkModuleFederationStatus();
  }

  simulateRemoteLoad(): void {
    this.moduleFederationStatus.simulateRemoteLoad('react-mapping-app');
  }
} 