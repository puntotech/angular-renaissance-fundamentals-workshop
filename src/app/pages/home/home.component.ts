import { Component, DestroyRef, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../shared/services/hero.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
      selector: 'app-home',
      imports: [HeroListComponent, AsyncPipe],
      template: `
    @if(heroes$ | async; as heroes){
      <app-hero-list [heroes]="heroes" />
    }`,
    })
    export class HomeComponent {
      readonly #heroService = inject(HeroService);
      readonly #destroyRef = inject(DestroyRef);
        /* TODO 721: Change heroes$ to be the heroes$ subject from the service */
      readonly heroes$ = this.#heroService.heroes$;

        /* TODO 721: Invoke to load method from the service and subscribe to it.
          Finally, use takeUntilDestroyed operator to avoid memory leaks.
        */
        constructor(){
            this.#heroService.load()
              .pipe(takeUntilDestroyed(this.#destroyRef))
              .subscribe();
        }
  }
