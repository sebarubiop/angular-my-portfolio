import { Injectable } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

export interface MappingAppConfig {
  containerId: string;
  props?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class MicroFrontendService {

  constructor() { }

  async loadReactMappingApp(config: MappingAppConfig): Promise<any> {
    try {
      const module = await loadRemoteModule({
        remoteEntry: 'https://react-mapping-app-7777.web.app/remoteEntry.js',
        remoteName: 'react-mapping-app',
        exposedModule: './App' // Adjust based on what the React app exposes
      });

      return module;
    } catch (error) {
      console.error('Failed to load React mapping app:', error);
      throw error;
    }
  }

  async loadReactMappingAppComponent(config: MappingAppConfig): Promise<any> {
    try {
      const module = await loadRemoteModule({
        remoteEntry: 'https://react-mapping-app-7777.web.app/remoteEntry.js',
        remoteName: 'react-mapping-app',
        exposedModule: './MappingComponent' // Adjust based on what the React app exposes
      });

      return module;
    } catch (error) {
      console.error('Failed to load React mapping component:', error);
      throw error;
    }
  }
} 