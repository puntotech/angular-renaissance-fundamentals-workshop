import { Component, ResourceStatus, computed, effect, inject, input, numberAttribute, signal } from '@angular/core';

import { HEROES_PAGES } from '../../heroes.router';
import { Hero } from '../../interfaces/hero.interface';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { HeroItemNotFoundComponent } from '../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../services/hero.service';
import { NEVER } from 'rxjs';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent, HeroItemNotFoundComponent],
  template: `
@if(isValidHero()){
<div class="flex flex-col items-center bg-[rgb(94,104,255)]">
  <h3 class="text-2xl font-bold text-white">Update an Hero!</h3>
    <app-hero-form [hero]="hero()" (sendHero)="updateHero($event)"></app-hero-form>
</div>
 } @else {
    <app-hero-item-not-found/>
}`
})
export class HeroUpdateComponent {
  readonly #router = inject(Router);
  readonly id = input(0, { transform: numberAttribute });
  readonly #heroService = inject(HeroService);
  /* TODO 833: Retrieve the `hero-form.component` using the `viewChild` function and store it in an attribute called `heroFormComponent`.  */

  readonly #heroResource = rxResource({
    request: () => this.id(),
    loader: () => this.#heroService.findOne(this.id())
  });

  readonly hero = computed(() => this.#heroResource.value() ?? this.#heroService.defaultHero);
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero()));

  readonly heroSignal = signal<Hero>(this.#heroService.defaultHero);

  readonly heroToUpdateResource = rxResource({
    request: () => this.heroSignal(),
    loader: ({ request: hero }) => this.#heroService.isDefaultHero(hero) ? NEVER: this.#heroService.add(hero),
    equal: (a, b) => a.id === b.id,
  });
  isLoading = this.heroToUpdateResource.isLoading;
  error = this.heroToUpdateResource.error;
  isHeroToUpdateResourceCompleted = computed(() => this.heroToUpdateResource.status() === ResourceStatus.Resolved);
  navigateEffect = effect(() => {
    if(!this.#heroService.isDefaultHero(this.heroSignal()) && this.isHeroToUpdateResourceCompleted()){
      this.#router.navigate([HEROES_PAGES.HERO, HEROES_PAGES.HOME]);
    }
  });
  errorEffect = effect(() => {
    if(this.error()){
      console.log('Error', this.error());
    }
  });

  updateHero(hero: Hero){
    console.log("Updating Hero", hero);
    this.heroSignal.set(hero);
  }

  /* TODO 833: Create the `canDeactivate` method, which, if the `heroFormComponent` is `isPendingSave`, asks the user if they want to leave the page using `confirm`. Otherwise, return `true`. */

}
