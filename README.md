# Angular Renaissance Fundamentals Workshop 17+

In this step, we develop the following web:

![TailwindCSS](/docs/06.01-router-solved.gif)

In a SPA (_Single Page Application_), the user interface is updated by showing or hiding parts of the screen corresponding to specific components, rather than fetching an entirely new page from the server.

As users perform tasks within the application, they need to navigate between different views that have been defined.

The router enables navigation by interpreting a browser URL as an instruction to change the view.

The structure of components and pages in this branch is shown in the following image. Note that we have the following elements:

- **Pages**: Pages are the components routed through the router.  
  - **auth**: Pages related to the Authentication module.  
    - **Login**: Authentication page (developed later).  
    - **Register**: Registration page (developed later).  
  - **hero**: Pages related to heroes.  
    - **Hero-detail**: Page to display detailed information about a hero.  
    - **Hero-new**: Page to create a new hero, using the `hero-form` component.  
    - **Hero-update**: Page to update a hero, also using the `hero-form` component.  
  - **home**: The main page loaded when accessing the application. This page displays the `hero-list` component.  

- **Components**: The building blocks used to construct the application’s pages.  
  - **hero-form**: A form used to create or update a hero. The same form is used for both actions. In this branch, the hero object to be edited will not yet be passed as a parameter (developed later).  
  - **hero-list**: A component displaying a list of `hero-item` components.  
  - **hero-item**: A component showing information about a single hero.  

- **Shared**: Elements shared across the entire application.  
  - **Components**: Components used throughout the application.  
    - **header**: The header containing the navigation menu.  
    - **footer**: The footer displaying the copyright notice.  
  - **Interfaces**: Definitions of shared interfaces across the application.  
  - **Services**: Services shared across the application.  
  - **Validators**: Validators used in forms.
 
![Pages-Components](/docs/pages-components.png)

Official documentation:

- [Router](https://angular.dev/guide/routing)

## Code Setup

1. Configure `RouterOutlet` in `AppComponent` to use `<router-outlet/>`. 
```typescript
import { Component, inject } from '@angular/core';

import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { Hero } from './shared/interfaces/hero.interface';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroNewComponent } from './components/hero-new/hero-new.component';
import { HeroService } from './shared/services/hero.service';

/* TODO 603: Import RouterOutlet to enable routing using router-outlet. Remove unnecessary code in the component after this update. */
@Component({
  selector: 'app-root',
  imports: [HeroListComponent, HeroNewComponent, HeaderComponent, FooterComponent],
  template: `
<div class="grid min-h-screen grid-rows-[auto_1fr_auto] grid-cols-2 max-w-screen-2xl justify-between mx-auto pt-4">
  <app-header class="col-span-3"/>

  <app-hero-list [heroes]="heroes" class="col-span-2" />
  <app-hero-new (add)="addHero($event)" class="col-span-1"/>

  <app-footer class="col-span-3" />
</div>`
})
export class AppComponent {
  title = 'workshop-fundamentals';
  readonly #heroService = inject(HeroService);
  heroes = this.#heroService.findAll();

  addHero(hero: Hero){
    this.#heroService.add(hero);
  }
}
```

2. Create pages for navigation. Different components will be created to act as pages of the web application.
   - Authentication Pages:
     - `ng g c --skip-tests --inline-style pages/auth/login`
     - `ng g c --skip-tests --inline-style pages/auth/register`
   - Hero Pages:
     - `ng g c --skip-tests --inline-style pages/hero/hero-detail`
     - `ng g c --skip-tests --inline-style pages/hero/hero-new`
     - `ng g c --skip-tests --inline-style pages/hero/hero-update`
   - Home Page:
     - `ng g c --skip-tests --inline-style pages/home`

3. Rename the `components/hero-new.component` to `components/hero-form` since it encapsulates a form and is used for both creating and updating heroes. This component will be used by both `hero-new` and `hero-update` pages.
  - Use aliases to rename the `add` event to `sendHero` via the function's `output aliases`.
4. Modify the `pages/hero/hero-new.component.ts` to use the hero creation form component.

```typescript
import { Component, inject } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { HeroService } from '../../../shared/services/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-new',
  imports: [HeroFormComponent],
  template:`
<div class="flex flex-col items-center bg-[cadetblue]">
  <h3 class="text-2xl font-bold text-white">Add an Hero!</h3>
  <app-hero-form (sendHero)="addHero($event)" />
</div>`
})
export class HeroNewComponent {
  readonly #heroService = inject(HeroService);
  /* TODO 607: Inject the Router service into a private readonly property.  */
  private readonly router = inject(Router);

  addHero(_hero: Hero){
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 1000) + 1,
    };
    console.log("Creating Hero", hero);
    this.#heroService.add(hero);
    /* TODO 607: Navigate to the `/home` page  */
  }
}
```

5. The `hero-update` page should have the following content:

```typescript
import { Component, inject, input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent],
  template: `
<div class="flex flex-col items-center bg-[rgb(94,104,255)]">
  <h3 class="text-2xl font-bold text-white">Update an Hero!</h3>
  <app-hero-form (sendHero)="updateHero($event)"></app-hero-form>
</div>`
})
export class HeroUpdateComponent {
  /* TODO 608: Inject the Router service into a private readonly property. */
  updateHero(_hero: Hero){
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 1000) + 1,
    };
    console.log("Updating Hero", hero);
    /* TODO 608: Navigate to the `/home` page*/
  }
}
```
6. The `home` page will display the default list of heroes. Here, the `findAll` method from the `heroService` will be used. The content of the `HomeComponent` is as follows:

```typescript
import { Component, inject } from '@angular/core';

import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../shared/services/hero.service';

@Component({
  selector: 'app-home',
  imports: [HeroListComponent],
  template: `<app-hero-list [heroes]="heroes" />`,
})
export class HomeComponent {
  readonly #heroService = inject(HeroService);
  heroes = this.#heroService.findAll();
}
```

1. In the `hero-item.component.html` file, we will add two buttons that will allow us to navigate through the hero-related pages.

```html
 <hr class="m-4 border-amber-600" />
     <span
       class="btn btn-gray mr-2 text-xl"
       [routerLink]="['/hero', 'update', hero().id]"
       >Update</span
     >
     <span class="btn btn-blue text-xl" [routerLink]="['/hero', hero().id]"
       >View</span
     >
```

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 601** (`app.config.ts`) Configure the router in the application (ensure you have `provideRouter` set up).
- **TODO 602** (`app.router.ts`) Configure `heroes` routes using _Lazy Loading_ for components by utilizing `loadComponent`. The routes for the pages and their respective components should be as follows:
  - `/home` -> `pages/home/home.component`
  - `/hero/`
    - `new` -> `pages/hero/hero-new.component`
    - `update/:id` -> `pages/hero/hero-update/hero-update.component`
    - `:id` -> `pages/hero/hero-detail/hero-detail.component`
  - `/auth/`
    - `login` -> `pages/auth/login/login.component`
    - `register` -> `pages/auth/register/register.component`
  - `**` -> `pages/home/home.component`

- **TODO 603** (`app.component.ts`) Configure `RouterOutlet` in AppComponent to use `<router-outlet/>`. Remove unnecessary code in the component after this update..
- **TODO 604** (`header.component.ts`) Configure navigation between pages in the header using `RouterLink` to navigate through the configured pages.
- **TODO 605** (`header.component.ts`) Configure navigation between pages in the header by activating `routerLinkActive` with the CSS class `text-blue-700`.
- **TODO 606** (`hero-item.component.html`) Navigate to the view page (`/hero/:id`) and update page (`/hero/update/:id`) for each hero when clicking the navigation buttons.
- **TODO 607** (`hero-new.component.ts`) Navigate to the `/home` page once a new hero has been added (using the `router` service and the `navigate` method).
- **TODO 608** (`hero-update.component.ts`) Navigate to the `/home` page once a hero has been updated (using the `router` service and the `navigate` method). Currently, the correct hero information to edit is not displayed (the default hero will appear).

Enjoy your coding journey
