import { Routes } from '@angular/router';

export enum AUTH_PAGES {
  AUTH = 'auth',
  LOGIN = 'login',
  REGISTER ='register',
}

export const AUTH_ROUTES: Routes = [
{
  path: '',
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: AUTH_PAGES.LOGIN,
    },
    {
      path: AUTH_PAGES.LOGIN,
      loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
    },
    {
      path: AUTH_PAGES.REGISTER,
      loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent),
    }
  ],
},
  { path: "**", redirectTo: AUTH_PAGES.LOGIN },
];

