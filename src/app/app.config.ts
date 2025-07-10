import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withPreloading, PreloadAllModules } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

import { routes } from './app.routes';

export const config: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withPreloading(PreloadAllModules)
    ),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(BrowserAnimationsModule),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: {
        disabled: false,
        animation: {
          enterDuration: 300,
          exitDuration: 0
        }
      }
    }
  ]
};