import { Routes } from '@angular/router';
import { heroIdMatcher } from './matchers/hero-id.matcher';
import { heroResolver } from './guards/hero.resolver';

export enum HEROES_PAGES {
  HERO = '/hero',
  HOME = 'home',
  NEW ='new',
  UPDATE = 'update',
}

export const HEROES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: HEROES_PAGES.HOME,
      },
      {
        path: HEROES_PAGES.HOME,
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
      },
      {
        path: HEROES_PAGES.NEW,
        loadComponent: () => import('./pages/hero-new/hero-new.component').then(c => c.HeroNewComponent)
      },
      {
        path: `${HEROES_PAGES.UPDATE}/:id`,
        loadComponent: () => import('./pages/hero-update/hero-update.component').then(c => c.HeroUpdateComponent),
        resolve: { hero: heroResolver },
      },
      {
        loadComponent: () => import('./pages/hero-detail/hero-detail.component').then(c => c.HeroDetailComponent),
        matcher: heroIdMatcher,
      }
    ],
  },
  { path: "**", redirectTo: HEROES_PAGES.HOME },
];
