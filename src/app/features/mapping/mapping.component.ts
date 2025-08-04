import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';
import { MicroFrontendService } from '../../core/services/micro-frontend.service';
import { ReactWrapperComponent } from './react-wrapper.component';
import { MicroFrontendCommunicationService, ReactAppProps } from '../../core/services/micro-frontend-communication.service';
import { ModuleFederationStatusService } from '../../core/services/module-federation-status.service';
import { ModuleFederationStatusComponent } from './module-federation-status.component';

@Component({
  selector: 'app-mapping',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, ReactWrapperComponent, ModuleFederationStatusComponent],
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit, AfterViewInit {
  @ViewChild('mappingIframe') mappingIframe!: ElementRef<HTMLIFrameElement>;
  @ViewChild('mappingContainer') mappingContainer!: ElementRef<HTMLDivElement>;

  mappingUrl = 'https://react-mapping-app-7777.web.app/';
  useModuleFederation = true; // Enable Module Federation
  isLoading = false;
  loadError = false;
  isClientSide = false;
  moduleFederationLoaded = false;
  loadingMessage = 'Loading React mapping application...';
  errorMessage = '';
  retryCount = 0;
  maxRetries = 2;
  reactAppProps: ReactAppProps = {
    lat: 40.7128,
    lng: -74.0060,
    zoom: 10,
    title: 'Interactive Map'
  };

  constructor(
    private microFrontendService: MicroFrontendService,
    private communicationService: MicroFrontendCommunicationService,
    private moduleFederationStatus: ModuleFederationStatusService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.isClientSide = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Check Module Federation availability on client side
    if (this.isClientSide) {
      this.checkModuleFederationAvailability();
    }
    
    // Subscribe to React app props updates
    this.communicationService.getReactAppProps().subscribe(props => {
      this.reactAppProps = props;
    });
    
    // Listen for messages from React app
    this.communicationService.onMessageFromReact().subscribe(message => {
      if (message) {
        console.log('Message from React app:', message);
        this.handleReactMessage(message);
      }
    });

    // Monitor Module Federation status only on client side
    if (this.isClientSide) {
      this.moduleFederationStatus.getStatus().subscribe(status => {
        console.log('Module Federation Status:', status);
        if (status.isConnected) {
          console.log('✅ Module Federation is connected and ready!');
        }
      });
    }
  }

  ngAfterViewInit(): void {
    // Only load React app on client side
    if (this.isClientSide) {
      // Debug remote modules first
      this.microFrontendService.debugRemoteModules().then(() => {
        this.loadReactMappingApp();
      });
    }
  }

  private checkModuleFederationAvailability(): void {
    // Enable Module Federation if available
    if (this.isClientSide && this.microFrontendService.isModuleFederationAvailable()) {
      this.useModuleFederation = true;
      console.log('✅ Module Federation is available');
    } else {
      this.useModuleFederation = false;
      console.log('⚠️ Module Federation not available, using iframe fallback');
    }
  }

  async loadReactMappingApp(): Promise<void> {
    // Only load on client side
    if (!this.isClientSide) {
      console.log('React app loading skipped on server side');
      return;
    }

    try {
      this.isLoading = true;
      this.loadError = false;
      this.errorMessage = '';
      
      if (this.useModuleFederation) {
        this.loadingMessage = 'Loading React mapping app via Module Federation...';
        console.log('Loading React mapping app via Module Federation...');
      } else {
        this.loadingMessage = 'Loading React mapping app via iframe...';
        console.log('Loading React mapping app via iframe...');
      }
      
      const ReactApp = await this.microFrontendService.loadReactMappingAppWithProps({
        containerId: 'mapping-container',
        props: {
          // Add any props you want to pass to the React app
          initialLat: 40.7128,
          initialLng: -74.0060,
          zoom: 10
        }
      });

      if (ReactApp && this.mappingContainer) {
        // Render the React app in the container
        const result = ReactApp.render(this.mappingContainer.nativeElement, {
          lat: 40.7128,
          lng: -74.0060,
          zoom: 10
        });
        
        this.moduleFederationLoaded = this.useModuleFederation;
        console.log(`✅ React app loaded successfully via ${this.useModuleFederation ? 'Module Federation' : 'iframe'}`);
      }
      
      this.isLoading = false;
    } catch (error) {
      console.error('Failed to load React mapping app:', error);
      this.loadError = true;
      this.isLoading = false;
      this.errorMessage = this.getErrorMessage(error);
      
      // Try fallback if Module Federation failed and we haven't exceeded retry limit
      if (this.useModuleFederation && this.retryCount < this.maxRetries) {
        console.log(`Module Federation failed, trying iframe fallback (attempt ${this.retryCount + 1}/${this.maxRetries})...`);
        this.useModuleFederation = false;
        this.loadError = false; // Reset error for fallback attempt
        this.retryCount++;
        await this.loadReactMappingApp();
      } else if (this.retryCount >= this.maxRetries) {
        this.errorMessage = 'Failed to load React mapping app after multiple attempts. Please check your network connection and try again.';
      }
    }
  }

  private getErrorMessage(error: any): string {
    if (error.message?.includes('CORS')) {
      return 'Network error: CORS policy blocked the request. Using iframe fallback.';
    } else if (error.message?.includes('timeout')) {
      return 'Network error: Request timed out. Using iframe fallback.';
    } else if (error.message?.includes('fetch')) {
      return 'Network error: Failed to fetch remote app. Using iframe fallback.';
    } else {
      return 'Failed to load React mapping app. Using iframe fallback.';
    }
  }

  private handleReactMessage(message: any): void {
    switch (message.type) {
      case 'MAP_CLICK':
        console.log('Map clicked at:', message.data);
        break;
      case 'LOCATION_UPDATE':
        console.log('Location updated:', message.data);
        this.communicationService.updateReactAppProps({
          lat: message.data.lat,
          lng: message.data.lng
        });
        break;
      case 'ZOOM_CHANGE':
        console.log('Zoom changed:', message.data);
        this.communicationService.updateReactAppProps({
          zoom: message.data.zoom
        });
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  }
} 