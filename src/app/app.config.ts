import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    /* TODO 617: Update provideRouter using withComponentInputBinding()  */
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
