import { Component, inject, input } from '@angular/core';

import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroItemComponent } from '../hero-item/hero-item.component';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';
import { HeroService } from '../../shared/services/hero.service';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItemComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {
  /* TODO 404: Inject the `HeroService` into a private, read-only attribute. */
  readonly #heroService = inject(HeroService);
  public heroes = input.required<Hero[]>();

  /* TODO 405: Update the code to invoke the `update` method of the `heroService`.*/
  savePowerstats({ hero, powerstat, value}: HeroPowerstatsChange){
    this.#heroService.update(hero, powerstat, value);
  }
}
