import { Component, DestroyRef, inject, input } from '@angular/core';

import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroItemComponent } from '../hero-item/hero-item.component';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';
import { HeroService } from '../../shared/services/hero.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  readonly #destroyRef = inject(DestroyRef);

  public heroes = input.required<Hero[]>();

    /* TODO 716: Update the method savePowerstats to subscribe to the service.
    Use the operator takeUntilDestroyed to avoid memory leaks (import it from '@angular/core/rxjs-interop').
    Inject and use the DestroyRef service to destroy the subscription when the component is destroyed.
    */
  savePowerstats({ hero, powerstat, value}: HeroPowerstatsChange){
    this.#heroService.updatePowerstat(hero, powerstat, value)
    .pipe(takeUntilDestroyed(this.#destroyRef))
    .subscribe({
      next: () => console.log('Powerstat updated'),
      error: (error) => console.error('Failed to update powerstat', error),
      complete: () => console.log('Powerstat update complete'),
    });
  }

   /* TODO 717: Update the method removeHero to subscribe to the service.
    Use the operator takeUntilDestroyed to avoid memory leaks (import it from '@angular/core/rxjs-interop').
    Inject and use the DestroyRef service to destroy the subscription when the component is destroyed.
    */
   // Warning: Doesn't refresh heroes (input Signal) because it's only for reading.

  removeHero(hero: Hero){
    this.#heroService.remove(hero)
    .pipe(takeUntilDestroyed(this.#destroyRef))
    .subscribe({ // Warning: Doesn't refresh heroes (input Signal) because it's only for reading.
      next: () => console.log('Hero removed'),
      error: (error) => console.error('Failed to remove hero', error),
      complete: () => console.log('Hero removed complete'),
    });
  }
}
