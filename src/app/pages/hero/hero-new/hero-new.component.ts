import { Component, DestroyRef, inject } from '@angular/core';

import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroFormComponent } from '../../../components/hero-form/hero-form.component';
import { HeroService } from '../../../shared/services/hero.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  readonly #router = inject(Router);
  /* TODO 742: Create heroSignal using the default value this.#heroService.defaultHero */
  /* TODO 742: Create heroResource using rxResource where the request is the heroSignal and the loader is the add method from the hero service.
              The loader should only be called when the hero is different from the default hero.
              Also, create an equal function that compares the id of the heroes. */
  /* TODO 742: Create isLoading, error, and isHeroResourceCompleted signals from the heroResource */
  /* TODO 742: Create a navigateEffect that navigates to the home page when the hero is different from the default hero and the heroResource is resolved */
  /* TODO 742: Create an errorEffect that logs the error when the heroResource has an error */

  /* Remove the destroyRef property */
  readonly #destroyRef = inject(DestroyRef);

  addHero(_hero: Hero){
    const hero: Hero = {
      ..._hero,
      id: Math.floor(Math.random() * 1000) + 1,
    };
    console.log("Creating Hero", hero);
    /* TODO 742: Replace the observable with the heroSignal */
    this.#heroService.add(hero).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(
      {
        next: (hero) => console.log('Hero created', hero),
        error: (error) => console.error('Failed to create hero', error),
        complete: () => console.log('Hero creation complete'),
      }
    );
    this.#router.navigate(['/home']);
  }
}
