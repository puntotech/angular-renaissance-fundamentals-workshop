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

  savePowerstats({ hero, powerstat, value}: HeroPowerstatsChange){
    this.#heroService.updatePowerstat(hero, powerstat, value)
    .pipe(takeUntilDestroyed(this.#destroyRef))
    .subscribe({
      next: () => console.log('Powerstat updated'),
      error: (error) => console.error('Failed to update powerstat', error),
      complete: () => console.log('Powerstat update complete'),
    });
  }

  removeHero(hero: Hero){
    this.#heroService.remove(hero)
    .pipe(takeUntilDestroyed(this.#destroyRef))
    .subscribe({ // Now the hero is removed from UI because the view is subscribe to State (heroe$ from BehivourSubject).
      next: () => console.log('Hero removed'),
      error: (error) => console.error('Failed to remove hero', error),
      complete: () => console.log('Hero removed complete'),
    });
  }
}
