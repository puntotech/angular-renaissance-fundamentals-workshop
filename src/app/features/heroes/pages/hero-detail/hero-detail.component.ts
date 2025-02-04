import { Component, computed, inject, input, numberAttribute } from '@angular/core';

import { HeroItemComponent } from '../../components/hero-item/hero-item.component';
import { HeroItemNotFoundComponent } from '../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../services/hero.service';
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

    readonly #heroResource = rxResource({
      request: () => this.id(),
      loader: () => this.#heroService.findOne(this.id())
    });

     hero = computed(() => this.#heroResource.value() ?? this.#heroService.defaultHero);
 }
