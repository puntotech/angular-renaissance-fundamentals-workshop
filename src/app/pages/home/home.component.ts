import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../shared/services/hero.service';

@Component({
  selector: 'app-home',
  imports: [HeroListComponent, AsyncPipe],
  template: `
@let heroes = (heroes$ | async)?.heroes;
@if(heroes){
  <app-hero-list [heroes]="heroes" />
}
`,
})
export class HomeComponent {
  readonly #heroService = inject(HeroService);
  /* TODO 721: Change heroes$ to be the heroes$ subject from the service */
  heroes$ = this.#heroService.findAll();
  /* TODO 721: Invoke to load method from the service and subscribe to it.
  Finally, use takeUntilDestroyed operator to avoid memory leaks.
  */

}
