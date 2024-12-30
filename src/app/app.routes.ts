import { Routes } from '@angular/router';

/* TODO 602: Configure `heroes` routes using _Lazy Loading_ for components by utilizing `loadComponent`.   */
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'hero',
    children: [
      {
        path: 'new',
        loadComponent: () => import('./pages/hero/hero-new/hero-new.component').then(c => c.HeroNewComponent)
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./pages/hero/hero-update/hero-update.component').then(c => c.HeroUpdateComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/hero/hero-detail/hero-detail.component').then(c => c.HeroDetailComponent),
      }
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register.component').then(c => c.RegisterComponent),
      }
    ],
  },
  { path: "**", redirectTo: "home" },
];
