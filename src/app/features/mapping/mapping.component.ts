import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-mapping',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit, AfterViewInit {
  @ViewChild('mappingIframe') mappingIframe!: ElementRef<HTMLIFrameElement>;
  @ViewChild('mappingContainer') mappingContainer!: ElementRef<HTMLDivElement>;

  mappingUrl = 'https://react-mapping-app-7777.web.app/';
  useModuleFederation = false; // Set to true when Module Federation is properly configured

  constructor() { }

  ngOnInit(): void {
    // Check if Module Federation is available
    this.checkModuleFederationAvailability();
  }

  ngAfterViewInit(): void {
    if (this.useModuleFederation) {
      this.loadReactMappingApp();
    }
  }

  private checkModuleFederationAvailability(): void {
    // Check if Module Federation is properly configured
    // For now, we'll use the iframe approach
    this.useModuleFederation = false;
  }

  private async loadReactMappingApp(): Promise<void> {
    try {
      // This would be implemented when Module Federation is properly set up
      console.log('Loading React mapping app via Module Federation...');
    } catch (error) {
      console.error('Failed to load React mapping app:', error);
      // Fallback to iframe
      this.useModuleFederation = false;
    }
  }
} 