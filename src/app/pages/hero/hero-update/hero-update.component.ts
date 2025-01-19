import { ActivatedRoute, Router } from '@angular/router';
import { Component, DestroyRef, computed, inject } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../../shared/services/hero.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent, HeroItemNotFoundComponent],
  template: `
@if(isValidHero()){
<div class="flex flex-col items-center bg-[rgb(94,104,255)]">
  <h3 class="text-2xl font-bold text-white">Update an Hero!</h3>
    <app-hero-form [hero]="hero" (sendHero)="updateHero($event)"></app-hero-form>
</div>
 } @else {
    <app-hero-item-not-found/>
}`
})
export class HeroUpdateComponent {
  readonly #router = inject(Router);
  /* TODO 743: Using inputSignal to get the heroId instead of ActivatedRoute */
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #heroService = inject(HeroService);

  /* TODO 743: Remove destroyRef and use takeUntilDestroyed */
  readonly #destroyRef = inject(DestroyRef);

  /* TODO 743: Create #heroResource property from rxResource using this.#heroService.findOne as the loader function and this.id() as the request function */
  /* TODO 743: Create a computed property named hero that returns the value of #heroResource or the defaultHero from the #heroService */
  hero: Hero = this.#activatedRoute.snapshot.data['hero'];
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero));

  /* TODO 743: Create the heroSignal signal with the defaultHero from the #heroService */
  /* TODO 743: Create the #heroToUpdateResource property from rxResource using this.heroSignal as the request function and the #heroService.add as the loader function, also create an equal function that compares the id of the heroes */
  /* TODO 743: Create a isLoading property that returns the isLoading property from #heroToUpdateResource */
  /* TODO 743: Create an error property that returns the error property from #heroToUpdateResource */
  /* TODO 743: Create a computed property named isHeroToUpdateResourceCompleted that returns true if the status of #heroToUpdateResource is ResourceStatus.Resolved */
  /* TODO 743: Create an effect named navigateEffect that navigates to /home if the heroSignal is not the defaultHero and the #heroToUpdateResource is completed */
  /* TODO 743: Create an effect named errorEffect that logs the error from #heroToUpdateResource */
    updateHero(hero: Hero){
      console.log("Updating Hero", hero);

      /* TODO 743: Replace the observable with the heroSignal */
      this.#heroService.update(hero).pipe(
        takeUntilDestroyed(this.#destroyRef),
      ).subscribe({
        next: () => this.#router.navigate(['/home']),
        error: (error) => alert('Failed to update hero' + error)
      });
    }
}
