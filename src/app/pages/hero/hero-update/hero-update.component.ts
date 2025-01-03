import { ActivatedRoute, Router } from '@angular/router';
import { Component, computed, inject } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../../shared/services/hero.service';

@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent, HeroItemNotFoundComponent],
  template: `
<!-- TODO 616: Add a condition to check if the hero is valid. If it is, display the form. Otherwise, display the app-hero-item-not-found component. !-->
 @if(isValidHero()){
<div class="flex flex-col items-center bg-[rgb(94,104,255)]">
  <h3 class="text-2xl font-bold text-white">Update an Hero!</h3>
 <!-- TODO 613:  Modify the app-hero-form component to accept hero as an input parameter named hero. !-->
    <app-hero-form [hero]="hero" (sendHero)="updateHero($event)"></app-hero-form>
</div>
 } @else {
    <app-hero-item-not-found/>
}`
})
export class HeroUpdateComponent {
  readonly #router = inject(Router);
/* TODO 612: Inject `ActivatedRoute` and store the `hero` in a property named `hero` of type `Hero`  */
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #heroService = inject(HeroService);
  hero: Hero = this.#activatedRoute.snapshot.data['hero'];
 /* TODO 616: Create a computed property named `isValidHero` that returns true if the hero is not null. */
  isValidHero = computed(() => !this.#heroService.isNullHero(this.hero));

  updateHero(hero: Hero){
/* TODO 615: Update the updateHero method to call the update method of the #heroService with the hero." */

    console.log("Updating Hero", hero);
    this.#heroService.update(hero);
    this.#router.navigate(['/home']);
  }
}
