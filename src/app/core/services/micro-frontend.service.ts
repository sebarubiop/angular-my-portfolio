import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/module-federation';

export interface MappingAppConfig {
  containerId: string;
  props?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class MicroFrontendService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async loadReactMappingApp(config: MappingAppConfig): Promise<any> {
    // Only load on client side
    if (!isPlatformBrowser(this.platformId)) {
      console.log('React app loading skipped on server side');
      return null;
    }

    // For cross-origin remotes, try Module Federation first, then fallback to iframe
    console.log('🚀 Starting React app loading process...');
    
    try {
      // Try Module Federation first
      console.log('📦 Attempting Module Federation loading...');
      
      // Try different exposed module names to see which one works
      const moduleNames = ['./MapComponent', './LayerManager', './MappingStore', './App'];
      
      for (const moduleName of moduleNames) {
        try {
          console.log(`🔍 Trying to load module: ${moduleName}`);
          const module = await this.loadRemoteWithTimeout({
            remoteEntry: 'https://react-mapping-app-7777.web.app/remoteEntry.js',
            remoteName: 'mappingApp',
            exposedModule: moduleName
          });

          if (module && typeof module === 'object') {
            console.log(`✅ React app loaded successfully via Module Federation using ${moduleName}`);
            return module;
          }
        } catch (moduleError) {
          console.warn(`❌ Failed to load module ${moduleName}:`, moduleError);
          continue;
        }
      }
      
      throw new Error('All Module Federation attempts failed');
    } catch (error) {
      console.error('❌ Module Federation failed:', error);
      console.log('🔄 Falling back to iframe approach...');
      return this.createIframeApp(config);
    }
  }

  async loadReactMappingAppComponent(config: MappingAppConfig): Promise<any> {
    // Only load on client side
    if (!isPlatformBrowser(this.platformId)) {
      console.log('React component loading skipped on server side');
      return null;
    }

    // For cross-origin remotes, try Module Federation first, then fallback to iframe
    console.log('🚀 Starting React component loading process...');
    
    try {
      // Try Module Federation first
      console.log('📦 Attempting Module Federation component loading...');
      
      // Try different exposed module names to see which one works
      const moduleNames = ['./MapComponent', './LayerManager', './MappingStore', './App'];
      
      for (const moduleName of moduleNames) {
        try {
          console.log(`🔍 Trying to load component module: ${moduleName}`);
          const module = await this.loadRemoteWithTimeout({
            remoteEntry: 'https://react-mapping-app-7777.web.app/remoteEntry.js',
            remoteName: 'mappingApp',
            exposedModule: moduleName
          });

          if (module && typeof module === 'object') {
            console.log(`✅ React component loaded successfully via Module Federation using ${moduleName}`);
            return module;
          }
        } catch (moduleError) {
          console.warn(`❌ Failed to load component module ${moduleName}:`, moduleError);
          continue;
        }
      }
      
      throw new Error('All Module Federation component attempts failed');
    } catch (error) {
      console.error('❌ Module Federation component failed:', error);
      console.log('🔄 Falling back to iframe approach...');
      return this.createIframeApp(config);
    }
  }

  async loadReactMappingAppWithProps(config: MappingAppConfig): Promise<any> {
    // Only load on client side
    if (!isPlatformBrowser(this.platformId)) {
      console.log('React app with props loading skipped on server side');
      return null;
    }

    // For cross-origin remotes, try Module Federation first, then fallback to iframe
    console.log('🚀 Starting React app with props loading process...');
    
    try {
      // Try Module Federation first
      console.log('📦 Attempting Module Federation app with props loading...');
      
      // Try different exposed module names to see which one works
      const moduleNames = ['./MapComponent', './LayerManager', './MappingStore', './App'];
      
      for (const moduleName of moduleNames) {
        try {
          console.log(`🔍 Trying to load app with props module: ${moduleName}`);
          const module = await this.loadRemoteWithTimeout({
            remoteEntry: 'https://react-mapping-app-7777.web.app/remoteEntry.js',
            remoteName: 'mappingApp',
            exposedModule: moduleName
          });

          if (module && typeof module === 'object') {
            console.log(`✅ React app with props loaded successfully via Module Federation using ${moduleName}`);
            
            // If the React app exposes a component factory, we can use it
            if (module.default) {
              return {
                render: (container: HTMLElement, props: any) => {
                  try {
                    // Use React's createRoot or render method
                    if (typeof module.default === 'function') {
                      // If it's a React component
                      const React = require('react');
                      const ReactDOM = require('react-dom/client');
                      
                      const root = ReactDOM.createRoot(container);
                      const AppComponent = module.default;
                      root.render(React.createElement(AppComponent, props));
                      
                      return root;
                    } else if (module.default && typeof module.default.render === 'function') {
                      // If it has a render method
                      return module.default.render(container, props);
                    }
                  } catch (renderError) {
                    console.error('Failed to render React component:', renderError);
                    // Fallback to iframe
                    return this.createIframeApp(config).render(container, props);
                  }
                }
              };
            }

            return module;
          }
        } catch (moduleError) {
          console.warn(`❌ Failed to load app with props module ${moduleName}:`, moduleError);
          continue;
        }
      }
      
      throw new Error('All Module Federation app with props attempts failed');
    } catch (error) {
      console.error('❌ Module Federation app with props failed:', error);
      console.log('🔄 Falling back to iframe approach...');
      return this.createIframeApp(config);
    }
  }

  private async loadRemoteWithTimeout(remoteConfig: any): Promise<any> {
    const timeout = 15000; // 15 seconds timeout for cross-origin
    
    console.log('🔍 Loading remote module with config:', remoteConfig);
    
    try {
      // First, ensure the remote entry is loaded
      await this.ensureRemoteEntryLoaded(remoteConfig.remoteEntry);
      
      // Wait a bit for the remote to initialize
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('📦 Attempting to load module via Module Federation...');
      const result = await Promise.race([
        loadRemoteModule(remoteConfig),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Module Federation timeout')), timeout)
        )
      ]);
      
      console.log('✅ Remote module loaded successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to load remote module:', error);
      
      // If it's a CORS or container issue, provide more specific error info
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('get') || errorMessage.includes('undefined')) {
        console.log('💡 This appears to be a CORS or container initialization issue');
        console.log('💡 The remote might not be properly configured for cross-origin access');
      }
      
      throw error;
    }
  }

  private async ensureRemoteEntryLoaded(remoteEntryUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      const existingScript = document.querySelector(`script[src="${remoteEntryUrl}"]`);
      if (existingScript) {
        console.log('✅ Remote entry script already loaded');
        resolve();
        return;
      }

      console.log('📥 Loading remote entry script:', remoteEntryUrl);
      const script = document.createElement('script');
      script.src = remoteEntryUrl;
      script.type = 'text/javascript';
      
      script.onload = () => {
        console.log('✅ Remote entry script loaded successfully');
        resolve();
      };
      
      script.onerror = (error) => {
        console.error('❌ Failed to load remote entry script:', error);
        reject(new Error(`Failed to load remote entry: ${remoteEntryUrl}`));
      };
      
      document.head.appendChild(script);
    });
  }

  private async checkRemoteAvailability(url: string): Promise<boolean> {
    try {
      // For cross-origin remotes, we'll assume they're available if we can load the script
      // The actual availability will be determined when we try to load modules
      console.log(`🔍 Checking remote availability at ${url}`);
      
      // Try a simple script load test
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        
        script.onload = () => {
          console.log(`✅ Remote script loaded successfully: ${url}`);
          resolve(true);
        };
        
        script.onerror = () => {
          console.warn(`❌ Failed to load remote script: ${url}`);
          resolve(false);
        };
        
        // Set a timeout
        setTimeout(() => {
          console.warn(`⏰ Remote script load timeout: ${url}`);
          resolve(false);
        }, 5000);
        
        document.head.appendChild(script);
      });
    } catch (error) {
      console.warn(`Failed to check remote at ${url}:`, error);
      return false;
    }
  }

  private createIframeApp(config: MappingAppConfig): any {
    // Create a simple iframe-based React app loader as fallback
    return {
      render: (container: HTMLElement, props: any) => {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://react-mapping-app-7777.web.app/';
        iframe.style.width = '100%';
        iframe.style.height = '500px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        
        // Add props as URL parameters
        if (props) {
          const params = new URLSearchParams();
          Object.entries(props).forEach(([key, value]) => {
            params.append(key, String(value));
          });
          iframe.src += `?${params.toString()}`;
        }

        container.innerHTML = '';
        container.appendChild(iframe);
        
        return iframe;
      }
    };
  }

  // Method to check if Module Federation is available
  isModuleFederationAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && 'webpackChunkload' in window;
  }

  // Method to check if we're on the client side
  isClientSide(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Method to debug available modules in remote entry
  async debugRemoteModules(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Debug skipped on server side');
      return;
    }

    try {
      console.log('🔍 Debugging remote modules...');
      
      // Try to access the remote container directly
      const remoteUrl = 'https://react-mapping-app-7777.web.app/remoteEntry.js';
      const remoteName = 'mappingApp';
      
      // Load the remote entry script
      const script = document.createElement('script');
      script.src = remoteUrl;
      script.type = 'text/javascript';
      
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      
      // Wait a bit for the script to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if the remote container is available
      if ((window as any)[remoteName]) {
        const container = (window as any)[remoteName];
        console.log('✅ Remote container found:', container);
        
        // Try to get available modules
        if (container.get) {
          const moduleNames = ['./MapComponent', './LayerManager', './MappingStore', './App'];
          
          for (const moduleName of moduleNames) {
            try {
              const module = await container.get(moduleName);
              console.log(`✅ Module ${moduleName} is available:`, module);
            } catch (error) {
              console.log(`❌ Module ${moduleName} is not available:`, error);
            }
          }
        } else {
          console.log('❌ Container does not have get method');
        }
      } else {
        console.log('❌ Remote container not found. Checking for any container-like objects...');
        // Try to find any container-like objects more safely
        const potentialContainers = [];
        for (const key in window) {
          try {
            const obj = (window as any)[key];
            if (obj && typeof obj === 'object' && obj.get && typeof obj.get === 'function') {
              potentialContainers.push(key);
              console.log(`🔍 Found potential container: ${key}`);
            }
          } catch (e) {
            // Skip properties that cause CORS errors
            continue;
          }
        }
        
        if (potentialContainers.length > 0) {
          console.log('Potential containers found:', potentialContainers);
        } else {
          console.log('No container-like objects found');
        }
      }
    } catch (error) {
      console.error('Failed to debug remote modules:', error);
      console.log('This might be due to CORS restrictions. Trying Module Federation directly...');
    }
  }
} 