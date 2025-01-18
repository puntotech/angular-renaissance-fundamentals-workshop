import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../shared/services/hero.service';

/* TODO 713: Import the AsyncPipe */
@Component({
  selector: 'app-home',
  imports: [HeroListComponent, AsyncPipe],
  template: `
<!-- TODO 713: Create a heroes variable from from the observable heroes$ using the pipe Async.
    if the variable heroes is truthy, render the HeroListComponent with the heroes property bound to it. -->
@let heroes = (heroes$ | async)?.heroes;
@if(heroes){
  <app-hero-list [heroes]="heroes" />
}
`,
})
export class HomeComponent {
  readonly #heroService = inject(HeroService);
  /* TODO 713: Create an observable heroes$ from the HeroService findAll method */
  heroes$ = this.#heroService.findAll();
}
