import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MicroFrontendMessage {
  type: string;
  data: any;
  source: string;
  timestamp: number;
}

export interface ReactAppProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  title?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class MicroFrontendCommunicationService {
  private messageSubject = new BehaviorSubject<MicroFrontendMessage | null>(null);
  private reactAppProps = new BehaviorSubject<ReactAppProps>({
    lat: 40.7128,
    lng: -74.0060,
    zoom: 10,
    title: 'Interactive Map'
  });

  constructor() {
    this.setupMessageListener();
  }

  // Send message to React app
  sendMessageToReact(type: string, data: any): void {
    const message: MicroFrontendMessage = {
      type,
      data,
      source: 'angular-portfolio',
      timestamp: Date.now()
    };

    // Send via postMessage if iframe is used
    if (typeof window !== 'undefined') {
      window.postMessage(message, '*');
    }

    // Also emit locally for Angular components
    this.messageSubject.next(message);
  }

  // Listen for messages from React app
  onMessageFromReact(): Observable<MicroFrontendMessage | null> {
    return this.messageSubject.asObservable();
  }

  // Update React app props
  updateReactAppProps(props: Partial<ReactAppProps>): void {
    const currentProps = this.reactAppProps.value;
    this.reactAppProps.next({ ...currentProps, ...props });
  }

  // Get current React app props
  getReactAppProps(): Observable<ReactAppProps> {
    return this.reactAppProps.asObservable();
  }

  // Setup message listener for cross-frame communication
  private setupMessageListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('message', (event) => {
        if (event.data && event.data.source === 'react-mapping-app') {
          this.messageSubject.next(event.data);
        }
      });
    }
  }

  // Simulate React app communication (for demo purposes)
  simulateReactAppMessage(type: string, data: any): void {
    setTimeout(() => {
      const message: MicroFrontendMessage = {
        type,
        data,
        source: 'react-mapping-app',
        timestamp: Date.now()
      };
      this.messageSubject.next(message);
    }, 1000);
  }

  // Get current props value
  getCurrentProps(): ReactAppProps {
    return this.reactAppProps.value;
  }
} 