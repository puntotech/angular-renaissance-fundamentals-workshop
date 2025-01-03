import { Routes } from '@angular/router';

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
        /* TODO 611: Use `heroResolver` to send a `hero` object via the route resolver for the `/hero/hero-update/:id` route, ensuring the `hero-update` component receives the `hero` object fetched based on the route's `id`. */
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/hero/hero-detail/hero-detail.component').then(c => c.HeroDetailComponent),
        /* TODO 618: Use `heroIdMatcher` to validate that the param is a valid number for the `/hero/hero-details/:id` route. */
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
