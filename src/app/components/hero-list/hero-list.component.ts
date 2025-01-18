import { Component, inject, input } from '@angular/core';

import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroItemComponent } from '../hero-item/hero-item.component';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';
import { HeroService } from '../../shared/services/hero.service';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItemComponent],
  templateUrl: './hero-list.component.html',
})
export class HeroListComponent {
  readonly #heroService = inject(HeroService);
  public heroes = input.required<Hero[]>();

  /* TODO 716: Update the method savePowerstats to subscribe to the service.
    Use the operator takeUntilDestroyed to avoid memory leaks (import it from '@angular/core/rxjs-interop').
    Inject and use the DestroyRef service to destroy the subscription when the component is destroyed.
    */

  savePowerstats({ hero, powerstat, value}: HeroPowerstatsChange){
    this.#heroService.updatePowerstat(hero, powerstat, value);
  }


  /* TODO 717: Update the method removeHero to subscribe to the service.
    Use the operator takeUntilDestroyed to avoid memory leaks (import it from '@angular/core/rxjs-interop').
    Inject and use the DestroyRef service to destroy the subscription when the component is destroyed.
    */
   // Warning: Doesn't refresh heroes (input Signal) because it's only for reading.
  removeHero(hero: Hero){
    this.#heroService.remove(hero);
  }
}
