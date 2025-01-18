import { Component, computed, inject, input, numberAttribute } from '@angular/core';

import { HeroItemComponent } from "../../../components/hero-item/hero-item.component";
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../../shared/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItemComponent, HeroItemNotFoundComponent],
  template: `
<!--TODO 718: Define a variable hero that is the result of the async operation hero$ using the pipe async.
              if hero is valid, display the app-hero-item component with the hero as input. Otherwise, display the app-hero-item-not-found component.
-->

@if(this.isValidHero()){
  <app-hero-item [hero]="hero()" [readonly]="true" />
}@else{
  <app-hero-item-not-found />
}`,
})
export class HeroDetailComponent {
  id = input(0, { transform: numberAttribute });
  #heroService = inject(HeroService);
  /* TODO 718: Remove the hero and isValid properties */
  hero = computed<Hero>(() => this.#heroService.findOne(this.id()));
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero()));

  /* TODO 718: Implement the ngOnChanges lifecycle hook to update the hero$ observable.
  ngOnChanges(){
    this.hero$ = this.#heroService.findOne(this.id());
  }
  */

}
