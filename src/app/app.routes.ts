import { Routes } from '@angular/router';

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
      },
      {
        path: FEATURES_PAGES.AUTH,
        loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES),
      },
    ]
  },

  { path: "**", redirectTo: FEATURES_PAGES.AUTH },
];
