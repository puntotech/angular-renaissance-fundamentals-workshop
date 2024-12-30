import { Component, inject } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { HeroService } from '../../../shared/services/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-new',
  imports: [HeroFormComponent],
  template:`
<div class="flex flex-col items-center bg-[cadetblue]">
  <h3 class="text-2xl font-bold text-white">Add an Hero!</h3>
  <app-hero-form (sendHero)="addHero($event)" />
</div>`
})
export class HeroNewComponent {
  readonly #heroService = inject(HeroService);
  /* TODO 607: Inject the Router service into a private readonly property.  */
  readonly #router = inject(Router);

  addHero(_hero: Hero){
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 1000) + 1,
    };
    console.log("Creating Hero", hero);
    this.#heroService.add(hero);
    /* TODO 607: Navigate to the `/home` page  */
    this.#router.navigate(['/home']);

  }
}
