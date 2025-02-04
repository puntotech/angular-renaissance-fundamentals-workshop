import { Component, ResourceStatus, computed, effect, inject, input, signal } from '@angular/core';
import { EMPTY, of } from 'rxjs';

import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroItemComponent } from '../hero-item/hero-item.component';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';
import { HeroService } from '../../shared/services/hero.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItemComponent],
  template: `
<div class="flex flex-wrap justify-center gap-4 ">
  @for (hero of heroes(); track hero.id) {
    <app-hero-item [hero]="hero" (powerstatsChange)="savePowerstats($event)" (removeHero)="removeHero($event)"/>
  } @empty {
    <h1 aria-hidden="true"> There are no Heroes. </h1>
  }
  </div>`,
})
export class HeroListComponent {
  readonly #heroService = inject(HeroService);
  public heroes = input.required<Hero[]>();
  /* TODO 744: Remove destroyRef and use takeUntilDestroyed */

  /* TODO 744: Create the heroToRemoveSignal signal with the defaultHero from the #heroService */
  /* TODO 744: Create the heroToUpdateSignal signal with the defaultHero from the #heroService */
  heroToRemoveSignal = signal<Hero>(this.#heroService.defaultHero);
  heroToUpdateSignal = signal<HeroPowerstatsChange>({hero: this.#heroService.defaultHero, powerstat: 'intelligence' , value: 0});


  /* TODO 744: Create the heroToRemoveResource property from rxResource using this.heroToRemoveSignal as the request function and the #heroService.remove as the loader function if the hero is not the defaultHero */
  /* TODO 744: Create the heroToUpdateResource property from rxResource using this.heroToUpdateSignal as the request function and the #heroService.updatePowerstat as the loader function if the hero is not the defaultHero */
  heroToRemoveResource = rxResource({
    request: () => this.heroToRemoveSignal(),
    loader: ({ request: hero }) => this.#heroService.isDefaultHero(hero) ? EMPTY : this.#heroService.remove(hero),
  });
  heroToUpdateResource = rxResource({
    request: () => this.heroToUpdateSignal(),
    loader: ({ request: { hero, powerstat, value } }) => this.#heroService.isDefaultHero(hero) ? EMPTY : this.#heroService.updatePowerstat(hero, powerstat, value),
  });

  /* TODO 744: Create a computed property named isHeroToRemoveResourceCompleted that returns true if the status of #heroToRemoveResource is ResourceStatus.Resolved and the heroToRemoveSignal is not the defaultHero */
  /* TODO 744: Create a computed property named isHeroToUpdateResourceCompleted that returns true if the status of #heroToUpdateResource is ResourceStatus.Resolved and the heroToUpdateSignal value is not 0 */
  isHeroToRemoveResourceCompleted = computed(() => !this.#heroService.isDefaultHero(this.heroToRemoveSignal()) && this.heroToRemoveResource.status() === ResourceStatus.Resolved);
  isHeroToUpdateResourceCompleted = computed(() => this.heroToUpdateSignal().value !== 0 && this.heroToUpdateResource.status() === ResourceStatus.Resolved);

  /* TODO 744: Create an effect named errorRemoveHeroEffect that logs the error from #heroToRemoveResource */
  /* TODO 744: Create an effect named errorUpdateHeroEffect that logs the error from #heroToUpdateResource */
  errorRemoveHeroEffect = effect(() => {
    if(this.heroToRemoveResource.error()){
      console.log('Error', this.heroToRemoveResource.error());
    }
  });
  errorUpdateHeroEffect = effect(() => {
    if(this.heroToUpdateResource.error()){
      console.log('Error', this.heroToUpdateResource.error());
    }
  });

  /* TODO 744: Create an effect named completeRemoveHeroEffect that logs 'Hero removed completed' if isHeroToRemoveResourceCompleted is true */
  /* TODO 744: Create an effect named completeUpdateHeroEffect that logs 'Hero update completed' if isHeroToUpdateResourceCompleted is true */
  completeRemoveHeroEffect = effect(() => {
    if(this.isHeroToRemoveResourceCompleted()){
      console.log('Hero removed completed');
    }
  });

  completeUpdateHeroEffect = effect(() => {
    if(this.isHeroToUpdateResourceCompleted()){
      console.log('Hero update completed');
    }
  });

  savePowerstats({ hero, powerstat, value}: HeroPowerstatsChange){
    console.log("Saving Powerstats", hero, powerstat, value);
    /* TODO 744: Replace the observable with the heroToUpdateSignal */
      this.heroToUpdateSignal.set({hero, powerstat, value});
  }

  removeHero(hero: Hero){
    console.log("Removing Hero", hero);
    /* TODO 744: Replace the observable with the heroToRemoveSignal */
    this.heroToRemoveSignal.set(hero);
  }
}
