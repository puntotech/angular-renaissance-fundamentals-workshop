# Angular Renaissance Fundamentals Workshop 17+

In this step, we develop the following web:

![Router-params](/docs/06.02-router-params-solved.gif)


### Understanding Guards and Resolvers in Angular

**What Are Guards and Resolvers?**  
Guards are Angular services that control access to application routes. For instance, an authentication guard ensures that only logged-in users can access protected areas.  
Resolvers, on the other hand, pre-load data required for a specific route. For example, a resolver can fetch product details before displaying a product detail page.  

**Why Are They Important?**  
- **Guards** enhance security by restricting access to sensitive routes, like admin panels or private content.  
- **Resolvers** improve user experience by ensuring data is ready before a page loads, avoiding blank screens or missing information.  

**How Are They Used?**  
- **Guards**: Implement a service that follows Angular's guard interfaces (e.g., `CanActivate`). Use this service in your route configuration to secure specific routes.  
- **Resolvers**: Create a service that fetches data via an observable or promise. Attach this service to a route to load data before navigation.  

**Advantages**  
- **Enhanced Security**: Guards prevent unauthorized access, protecting sensitive areas of your application.  
- **Improved User Experience**: Resolvers ensure that data is always available when a page loads, offering a seamless experience.  

In summary, Guards and Resolvers act as silent gatekeepers of your Angular application—protecting routes and ensuring data availability when users need it most. Explore these features to build secure and user-friendly Angular apps!  

In this step, we will work with a resolver to retrieve the object before the page loads. Additionally, we’ll use the input function directly bound to the router, which simplifies the use of resolvers. On the other hand, we’ll cover guards later in the workshop.


Official documentation:

- [Router](https://angular.dev/guide/routing)
- [Resolve](https://angular.dev/api/router/Resolve)

## Code Setup

1. Update the hero service (`shared/services/hero.service.ts`). Now we will include CRUD operations on the `heroes` array, along with two new objects related to the hero: the default hero (`defaultHero`) and the invalid hero (`nullHero`). Additionally, there will be two new methods to determine if a hero is one of the two mentioned heroes (`isDefaultHero` and `isNullHero`).

```typescript
import { Hero, PowerStat } from '../interfaces/hero.interface';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroes: Hero[] = [
    {
      id: 620,
      name: "Spider-Man",
      powerstats: {
        intelligence: 90,
        strength: 55,
        speed: 67,
        durability: 75,
        power: 74,
        combat: 85
      },
      image: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/620-spider-man.jpg',
      alignment: "good",
    },
    {
      id: 225,
      name: "Doctor Octopus",
      powerstats: {
        intelligence: 94,
        strength: 48,
        speed: 33,
        durability: 40,
        power: 53,
        combat: 65
      },
      image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/225-doctor-octopus.jpg",
      alignment: "bad",
    },
    {
      id: 70,
      name: "Batman",
      powerstats: {
        intelligence: 100,
        strength: 26,
        speed: 27,
        durability: 50,
        power: 47,
        combat: 100
      },
      image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/70-batman.jpg",
      alignment: "good",
    },

  ];
  readonly defaultHero: Hero =   {
    id:  Math.floor(Math.random() * 10000) + 1000,
    name: 'Joker',
    image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/370-joker.jpg",
    alignment: 'bad',
    powerstats: {
      intelligence: 100,
      strength: 10,
      speed: 12,
      durability: 60,
      power: 43,
      combat: 70,
    }
  };
  readonly NullHero: Hero = {
    id:  Math.floor(Math.random() * 10000) + 1000,
    name: 'Not Found',
    image: "./assets/img/hero-not-found.png",
    alignment: 'bad',
    powerstats: {
      intelligence: -1,
      strength: -1,
      speed: -1,
      durability: -1,
      power: -1,
      combat: -1,
    }
  };

  add(hero: Hero){
    this.heroes.push(hero);
  }
  updatePowerstat(hero: Hero, powerstat: PowerStat, value: number){
    hero.powerstats[powerstat] += value;
  }
  update(heroToUpdate: Hero) {
    this.heroes = this.heroes.map(hero => hero.id === heroToUpdate.id ? heroToUpdate: hero);
  }
  findAll(): Hero[] {
    return this.heroes;
  }
  findOne(id: number): Hero{
    return this.heroes.find(hero => hero.id === id) || this.NullHero;
  }
  isDefaultHero(hero: Hero): boolean {
    return hero.id === this.defaultHero.id;
  }
  isNullHero(hero: Hero): boolean {
    return hero.id === this.NullHero.id;
  }
}
```

2. Create a resolver file in the path `shared/guards/hero.resolver.ts` with the following code:

```typescript
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { Hero } from '../interfaces/hero.interface';
import { HeroService } from '../services/hero.service';
import { inject } from '@angular/core';

export const heroResolver: ResolveFn<Hero> = (route: ActivatedRouteSnapshot) => {
  /* TODO 610: Return the `Hero` object corresponding to the `id` found in route.paramMap */
};
```

   Create a new component in the path `shared/components/hero-item-not-found.component.ts` with the following code:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-item-not-found',
  template: `<img src="assets/img/hero-not-found.png" alt="Hero not found" />`,
})
export class HeroItemNotFoundComponent { }
```

3. Create a new matcher function en the path `shared/matchers/hero-id.matcher.ts` with the following code:

```typescript
import { UrlMatchResult, UrlSegment } from '@angular/router';

export function heroIdMatcher(urlSegments: UrlSegment[]): UrlMatchResult | null {
  if (urlSegments[0].path.match(/^[\d]+$/gm)) {
    return { consumed: urlSegments, posParams: {id: new UrlSegment(urlSegments[0].path, {})} };
  }
  return null;
}
```

1. Update the `shared/components/hero-item.component.ts` to add a new input called `readonly` that follows: 

```typescript
import { Component, computed, input, output } from '@angular/core';
import { Hero, PowerStat } from '../../shared/interfaces/hero.interface';

import { CommonModule } from '@angular/common';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-item.component.html',
})
export class HeroItemComponent {
  hero = input.required<Hero>();
  readonly = input<boolean>(false);
  powerstatsChange = output<HeroPowerstatsChange>();
  isHeroVillain = computed(() => this.hero().alignment === "bad");

  decrementPowerStats(powerstat: PowerStat): void{
    this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: -1 });
  }

  incrementPowerStats(powerstat: PowerStat): void{
      this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: 1 });
  }
}
```

And the HTML is the following: 

```html
<div class="min-w-72 border border-black rounded-md p-2.5 inline-block" [class.text-white]="isHeroVillain()" [class.bg-rebeccapurple]="isHeroVillain()">
  <div class="flex justify-center">
    <img [src]="hero().image"/>
  </div>
  <div class="text-center">
    <div class="font-bold text-[1.4rem]">
       {{hero().name}}
       @if(isHeroVillain()){ 🦹 }@else {🦸}
    </div>
     @for(powerstat of hero().powerstats | keyvalue; track powerstat.key){
      <div class="flex justify-between">
        <span> {{powerstat.key | titlecase}}: {{powerstat.value}} </span>
         @if(!readonly()){
          <div class="hero-powerstats-buttons">
            <button class="btn btn-gray text-sm" [disabled]="powerstat.value === 0" (click)="decrementPowerStats(powerstat.key)">-</button>
            <button class="btn btn-gray text-sm" [disabled]="powerstat.value === 100" (click)="incrementPowerStats(powerstat.key)">+</button>
          </div>
        }
      </div>
     }
     @if(!readonly()){
     <hr class="m-4 border-amber-600" />
      <span class="btn btn-gray mr-2 text-xl" [routerLink]="['/hero', 'update', hero().id]">Update</span>
      <span class="btn btn-blue text-xl" [routerLink]="['/hero', hero().id]">View</span>
     }@else {
      <span class="btn btn-blue text-xl" [routerLink]="['/']">Back</span>
     }
 </div>
</div>
```

## Exercises
To develop the workshop exercises, you should have Angular running in development mode. Use the following npm script:

`npm run serve`

Once running, you can develop and see changes in real-time.

Look for the following TODOs in the source code. If you need the solution, switch to the branch with the `-solved` suffix.

- **TODO 610** (`shared/guards/hero.resolver.ts`): Complete the resolver.
- **TODO 611** (`app.routes.ts`) Use `heroResolver` to send a `hero` object via the route resolver for the `/hero/hero-update/:id` route, ensuring the `hero-update` component receives the `hero` object fetched based on the route's `id`.  
- **TODO 612** (`hero-update.component.ts`) Inject `ActivatedRoute` and store the `hero` in a property named `hero` of type `Hero`.  
- **TODO 613** (`hero-update.component.ts`)  
  - (`hero-update.component.ts`) Modify the `app-hero-form` component to accept `hero` as an input parameter named `hero`.  
  - (`hero-form.component.ts`) The default value for the `hero` input should be the `defaultHero` object from `HeroService`.  
  - (`hero-form.component.ts`) Remove `#defaultHero` since `defaultHero` from `HeroService` is being used.  
  - (`hero-form.component.ts`) Remove `heroSelected` as it is no longer needed, and update the `heroForm` to use `hero`.  
  - (`hero-form.component.ts`) Adjust `heroForm` to use `hero` instead of `heroSelected`.  
- **TODO 614** (`hero-form.component.ts/hero-form.component.html`) Create an attribute named `textButton`, which is a `signal<string>` containing either the word 'Update' or 'Create' depending on whether `hero` is the `defaultHero`.  
- **TODO 615** (`hero-form.component.ts`) Update the `updateHero` method to call the update method of the `#heroService` with the `hero`.
- **TODO 616** (`hero-update.component.ts`) Add a condition to check if the hero is valid. If it is, display the form. Otherwise, display the `HeroItemNotFound` component.

- **TODO 617** (`app.config.ts`) Update `provideRouter` using `withComponentInputBinding()`.
- **TODO 617**(`hero-detail.component.ts`) 
  - Create an input attribute called `id` with an initial value of 0, and a transformation function called `numberAttribute`.
  - Inject the `HeroService`
  - Create a computed property called `hero` that returns the `hero` with the `id` 
  - Create a computed property called `isValidHero` that returns true if the hero is not null
  - If `isValidHero` is true, render the `HeroItem` component with the `hero` and readonly attributes set to true. If `isValidHero` is false, render the `HeroItemNotFound` component.
- **TODO 618**(`app.routes.ts`) Use `heroIdMatcher` to validate that the param is a valid number for the `/hero/hero-details/:id` route.

Enjoy your coding journey
