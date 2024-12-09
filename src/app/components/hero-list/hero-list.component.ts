import { Component, input } from '@angular/core';

import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroItemComponent } from '../hero-item/hero-item.component';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItemComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {
  /* TODO 300: Transform the `heroes` attribute to be an `input.required<Hero[]>()` coming from `AppComponent`. */
  public heroes = input.required<Hero[]>();

  savePowerstats({ hero, powerstat, value}: HeroPowerstatsChange){
    hero.powerstats[powerstat] += value;
  }

}
