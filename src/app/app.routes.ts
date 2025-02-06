import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';

export enum FEATURES_PAGES {
  HERO = 'hero',
  AUTH = 'auth',
}

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: FEATURES_PAGES.AUTH,
      },
      {
        path: FEATURES_PAGES.HERO,
        loadChildren: () => import('./features/heroes/heroes.router').then(r => r.HEROES_ROUTES),
        /* TODO 830: Set up the `auth-guard` for the `heroes` feature, so that access is only allowed if the guard can be activated.*/
        canActivate: [authGuard],
      },
      {
        path: FEATURES_PAGES.AUTH,
        loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES),
      },
    ]
  },

  { path: "**", redirectTo: FEATURES_PAGES.AUTH },
];
