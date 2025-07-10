import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { serverRoutes } from './app/app.routes.server';
import { mergeApplicationConfig } from '@angular/core';

const serverConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
  ]
};
export const configServer = mergeApplicationConfig(config, serverConfig);

const bootstrap = () => bootstrapApplication(AppComponent, configServer);

export default bootstrap;