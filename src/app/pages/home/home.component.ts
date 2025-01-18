import { Component, DestroyRef, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../shared/services/hero.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
      selector: 'app-home',
      imports: [HeroListComponent],
      template: `
<!-- TODO 731: Change heroes$ to be heroes signal from the service -->
    @if(heroes()){
      <app-hero-list [heroes]="heroes()" />
    }`,
    })
    export class HomeComponent {
      readonly #heroService = inject(HeroService);
        /* TODO 731: Change heroes$ to be heroes signal from the service */
      readonly heroes = this.#heroService.heroes;

      constructor(private destroyRef: DestroyRef) {
        this.#heroService.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
      }
  }
