import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { dottechLoaderInterceptor } from './lib/dottech-loader/dottech-loader.interceptor';
import { routes } from './app.routes';
import { tokenInterceptor } from './shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
            provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling( {scrollPositionRestoration: 'enabled'})),
            provideHttpClient(withInterceptors([tokenInterceptor, dottechLoaderInterceptor])),
  ]
};
