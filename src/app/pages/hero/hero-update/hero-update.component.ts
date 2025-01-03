import { Component, inject } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent],
  template: `
<!-- TODO 616: Add a condition to check if the hero is valid. If it is, display the form. Otherwise, display the app-hero-item-not-found component. !-->
<div class="flex flex-col items-center bg-[rgb(94,104,255)]">
  <h3 class="text-2xl font-bold text-white">Update an Hero!</h3>
  <!-- TODO 613:  Modify the app-hero-form component to accept hero as an input parameter named hero. !-->
  <app-hero-form (sendHero)="updateHero($event)"></app-hero-form>
</div>`
})
export class HeroUpdateComponent {
  readonly #router = inject(Router);
  /* TODO 612: Inject `ActivatedRoute` and store the `hero` in a property named `hero` of type `Hero`  */

  /* TODO 616: Create a computed property named `isValidHero` that returns true if the hero is not null. */
  updateHero(_hero: Hero){

    /* TOOD 615: Update the updateHero method to call the update method of the #heroService with the hero." */
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 1000) + 1,
    };
    console.log("Updating Hero", hero);
    this.#router.navigate(['/home']);
  }
}
