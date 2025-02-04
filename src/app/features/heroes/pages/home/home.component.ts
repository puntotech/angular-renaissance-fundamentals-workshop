import { Component, inject } from '@angular/core';

import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../services/hero.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
      selector: 'app-home',
      imports: [HeroListComponent],
      template: `
    @if(heroes()){
      <app-hero-list [heroes]="heroes()" />
    }`,
    })
    export class HomeComponent {
      readonly #heroService = inject(HeroService);
      readonly heroes = this.#heroService.heroes;
      heroesResource = rxResource({
          loader: () => this.#heroService.load(),
        });
  }
