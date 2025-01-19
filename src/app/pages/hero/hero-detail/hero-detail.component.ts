import { Component, computed, inject, input, numberAttribute } from '@angular/core';

import { HeroItemComponent } from "../../../components/hero-item/hero-item.component";
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../../shared/services/hero.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItemComponent, HeroItemNotFoundComponent],
  template: `
@if(hero()){
  <app-hero-item [hero]="hero()" [readonly]="true" />
}@else{
  <app-hero-item-not-found />
}`,
})
export class HeroDetailComponent  {
  id = input(0, { transform: numberAttribute });
  readonly #heroService = inject(HeroService);

    /* TODO 741: Create a heroesResource property from rxResource using the loader this.#heroService.findOne() and  the request function should use this.id() */
    readonly #heroResource = rxResource({
      request: () => this.id(),
      loader: () => this.#heroService.findOne(this.id())
    });

    /* TODO 741: The hero should be a computed property that returns the value of the heroesResource or the NullHero from the #heroService */
    hero = computed(() => this.#heroResource.value() ?? this.#heroService.defaultHero);

  /* TODO 741: Replace the effect and constructor using the heroesResource */
}
