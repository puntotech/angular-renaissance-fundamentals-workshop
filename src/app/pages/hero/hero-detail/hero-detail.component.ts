import { Component, computed, inject, input, numberAttribute } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroItemComponent } from "../../../components/hero-item/hero-item.component";
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../../shared/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItemComponent, HeroItemNotFoundComponent],
  /* TODO 617: If isValidHero is true, render the HeroItem component with the hero and readonly attributes set to true. If isValidHero is false, render the HeroItemNotFound component.*/
  template: `
@if(this.isValidHero()){
  <app-hero-item [hero]="hero()" [readonly]="true" />
}@else{
  <app-hero-item-not-found />
}`,
})
export class HeroDetailComponent {
  /* TODO 617: Create an input attribute called 'id' with an initial value of 0, and a transformation function called 'numberAttribute' */
  id = input(0, { transform: numberAttribute });
 /* TODO 617: Inject the HeroService */
  #heroService = inject(HeroService);
  /* TODO 617: Create a computed property called 'hero' that returns the hero with the id */
  hero = computed<Hero>(() => this.#heroService.findOne(this.id()));
  /* TODO 617: Create a computed property called 'isValidHero' that returns true if the hero is not null */
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero()));
}
