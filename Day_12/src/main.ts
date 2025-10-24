import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, {
  providers: [
    // In a real app with multiple pages, you would
    // import { provideRouter } from '@angular/router';
    // import { routes } from './app/app.routes';
    // provideRouter(routes)
  ]
}).catch((err) => console.error(err));