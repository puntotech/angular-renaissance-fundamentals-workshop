import { Component, ResourceStatus, computed, effect, inject, input, numberAttribute, signal } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../../shared/services/hero.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
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
  /* TODO 743: Using inputSignal to get the heroId instead of ActivatedRoute */
  readonly id = input(0, { transform: numberAttribute });
  readonly #heroService = inject(HeroService);

  /* TODO 743: Remove destroyRef and use takeUntilDestroyed */

  /* TODO 743: Create #heroResource property from rxResource using this.#heroService.findOne as the loader function and this.id() as the request function */
  readonly #heroResource = rxResource({
    request: () => this.id(),
    loader: () => this.#heroService.findOne(this.id())
  });

  /* TODO 743: Create a computed property named hero that returns the value of #heroResource or the defaultHero from the #heroService */
  readonly hero = computed(() => this.#heroResource.value() ?? this.#heroService.defaultHero);
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero()));

  /* TODO 743: Create the heroSignal signal with the defaultHero from the #heroService */
  readonly heroSignal = signal<Hero>(this.#heroService.defaultHero);

  /* TODO 743: Create the #heroToUpdateResource property from rxResource using this.heroSignal as the request function and the #heroService.add as the loader function, also create an equal function that compares the id of the heroes */
  readonly heroToUpdateResource = rxResource({
    request: () => this.heroSignal(),
    loader: ({ request: hero }) => this.#heroService.isDefaultHero(hero) ? of(hero) : this.#heroService.add(hero),
    equal: (a, b) => a.id === b.id,
  });
  /* TODO 743: Create a isLoading property that returns the isLoading property from #heroToUpdateResource */
  isLoading = this.heroToUpdateResource.isLoading;
  /* TODO 743: Create an error property that returns the error property from #heroToUpdateResource */
  error = this.heroToUpdateResource.error;
  /* TODO 743: Create a computed property named isHeroToUpdateResourceCompleted that returns true if the status of #heroToUpdateResource is ResourceStatus.Resolved */
  isHeroToUpdateResourceCompleted = computed(() => this.heroToUpdateResource.status() === ResourceStatus.Resolved);
  /* TODO 743: Create an effect named navigateEffect that navigates to /home if the heroSignal is not the defaultHero and the #heroToUpdateResource is completed */
  navigateEffect = effect(() => {
    if(!this.#heroService.isDefaultHero(this.heroSignal()) && this.isHeroToUpdateResourceCompleted()){
      this.#router.navigate(['/home']);
    }
  });
  /* TODO 743: Create an effect named errorEffect that logs the error from #heroToUpdateResource */
  errorEffect = effect(() => {
    if(this.error()){
      console.log('Error', this.error());
    }
  });

  updateHero(hero: Hero){
    console.log("Updating Hero", hero);

    /* TODO 743: Replace the observable with the heroSignal */
    this.heroSignal.set(hero);
  }
}
