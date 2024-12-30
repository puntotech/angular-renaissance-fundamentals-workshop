import { Component, inject } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-update',
  imports: [HeroFormComponent],
  template: `
<div class="flex flex-col items-center bg-[rgb(94,104,255)]">
  <h3 class="text-2xl font-bold text-white">Update an Hero!</h3>
  <app-hero-form (sendHero)="updateHero($event)"></app-hero-form>
</div>`
})
export class HeroUpdateComponent {
  /* TODO 608: Inject the Router service into a private readonly property. */
  readonly #router = inject(Router);
  updateHero(_hero: Hero){
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 1000) + 1,
    };
    console.log("Updating Hero", hero);
    /* TODO 608: Navigate to the `/home` page*/
    this.#router.navigate(['/home']);
  }
}
