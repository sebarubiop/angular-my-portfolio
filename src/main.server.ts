import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config';

const serverConfig = {
  providers: [
    provideServerRendering(),
    ...config.providers
  ]
};

const bootstrap = () => bootstrapApplication(AppComponent, serverConfig);

export default bootstrap;