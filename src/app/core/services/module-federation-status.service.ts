import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ModuleFederationStatus {
  isEnabled: boolean;
  isConnected: boolean;
  remotes: RemoteStatus[];
  sharedDependencies: string[];
  lastError?: string;
}

export interface RemoteStatus {
  name: string;
  url: string;
  isAvailable: boolean;
  lastChecked: Date;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModuleFederationStatusService {
  private statusSubject = new BehaviorSubject<ModuleFederationStatus>({
    isEnabled: false, // Start as false, will be updated on client side
    isConnected: false,
    remotes: [
      {
        name: 'react-mapping-app',
        url: 'https://react-mapping-app-7777.web.app/remoteEntry.js',
        isAvailable: false,
        lastChecked: new Date()
      }
    ],
    sharedDependencies: [
      '@angular/core',
      '@angular/common',
      '@angular/router',
      '@angular/material',
      'react',
      'react-dom'
    ]
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only check Module Federation status on client side
    if (isPlatformBrowser(this.platformId)) {
      this.checkModuleFederationStatus();
    }
  }

  getStatus(): Observable<ModuleFederationStatus> {
    return this.statusSubject.asObservable();
  }

  getCurrentStatus(): ModuleFederationStatus {
    return this.statusSubject.value;
  }

  async checkModuleFederationStatus(): Promise<void> {
    // Only check on client side
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Module Federation status check skipped on server side');
      return;
    }

    try {
      // Check if Module Federation is available
      const isEnabled = typeof window !== 'undefined' && 'webpackChunkload' in window;
      
      // Check remote availability with better error handling
      const remotes = await this.checkRemotes();
      
      const status: ModuleFederationStatus = {
        isEnabled,
        isConnected: remotes.some(r => r.isAvailable),
        remotes,
        sharedDependencies: this.statusSubject.value.sharedDependencies
      };

      this.statusSubject.next(status);
      
      if (status.isConnected) {
        console.log('✅ Module Federation is connected and ready!');
      } else {
        console.log('⚠️ Module Federation is not connected. Remotes may not be available.');
      }
    } catch (error) {
      console.error('Error checking Module Federation status:', error);
      const currentStatus = this.statusSubject.value;
      this.statusSubject.next({
        ...currentStatus,
        lastError: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  private async checkRemotes(): Promise<RemoteStatus[]> {
    // Only check on client side
    if (!isPlatformBrowser(this.platformId)) {
      return this.statusSubject.value.remotes;
    }

    const remotes = this.statusSubject.value.remotes;
    const updatedRemotes: RemoteStatus[] = [];

    for (const remote of remotes) {
      try {
        const isAvailable = await this.checkRemoteAvailability(remote.url);
        updatedRemotes.push({
          ...remote,
          isAvailable,
          lastChecked: new Date(),
          error: isAvailable ? undefined : 'Remote not available'
        });
      } catch (error) {
        updatedRemotes.push({
          ...remote,
          isAvailable: false,
          lastChecked: new Date(),
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return updatedRemotes;
  }

  private async checkRemoteAvailability(url: string): Promise<boolean> {
    // Only check on client side
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        mode: 'cors',
        cache: 'no-cache'
      });
      
      if (!response.ok) {
        console.warn(`Remote at ${url} returned status ${response.status}`);
        return false;
      }
      
      return true;
    } catch (error) {
      console.warn(`Failed to check remote at ${url}:`, error);
      return false;
    }
  }

  // Simulate remote loading for demo purposes
  simulateRemoteLoad(remoteName: string): void {
    // Only simulate on client side
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const currentStatus = this.statusSubject.value;
    const updatedRemotes = currentStatus.remotes.map(remote => {
      if (remote.name === remoteName) {
        return {
          ...remote,
          isAvailable: true,
          lastChecked: new Date(),
          error: undefined
        };
      }
      return remote;
    });

    this.statusSubject.next({
      ...currentStatus,
      isConnected: updatedRemotes.some(r => r.isAvailable),
      remotes: updatedRemotes
    });
  }

  // Get detailed status for debugging
  getDetailedStatus(): any {
    const status = this.statusSubject.value;
    return {
      ...status,
      isClientSide: isPlatformBrowser(this.platformId),
      webpackChunkload: isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && 'webpackChunkload' in window,
      moduleFederationAvailable: isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && 'webpackChunkload' in window,
      timestamp: new Date().toISOString()
    };
  }
} 