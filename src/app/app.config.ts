import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
            provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling( {scrollPositionRestoration: 'enabled'})),
            provideHttpClient(),
  ]
};
