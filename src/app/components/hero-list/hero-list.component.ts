import { Component, inject, input } from '@angular/core';

import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroItemComponent } from '../hero-item/hero-item.component';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';
import { HeroService } from '../../shared/services/hero.service';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItemComponent],
  templateUrl: './hero-list.component.html',
 /*  TODO 503: Remove the hero-list.component.scss file */
})
export class HeroListComponent {
  readonly #heroService = inject(HeroService);
  public heroes = input.required<Hero[]>();

  savePowerstats({ hero, powerstat, value}: HeroPowerstatsChange){
    this.#heroService.update(hero, powerstat, value);
  }
}
