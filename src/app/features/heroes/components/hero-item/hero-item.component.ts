import { Component, computed, input, output } from '@angular/core';
import { Hero, PowerStat } from '../../interfaces/hero.interface';

import { CommonModule } from '@angular/common';
import { HEROES_PAGES } from '../../heroes.router';
import { HeroPowerstatsChange } from '../../interfaces/hero-powerstats-change';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-item.component.html',
})
export class HeroItemComponent {
  hero = input.required<Hero>();
  readonly = input<boolean>(false);
  powerstatsChange = output<HeroPowerstatsChange>();
  removeHero   = output<Hero>();
  isHeroVillain = computed(() => this.hero().alignment === "bad");

 navigation = computed (() => ({
  update: [HEROES_PAGES.HERO, HEROES_PAGES.UPDATE, this.hero().id],
  view: [HEROES_PAGES.HERO, this.hero().id],
  back: [HEROES_PAGES.HERO],
 }));

  decrementPowerStats(powerstat: PowerStat): void{
    this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: -1 });
  }

  incrementPowerStats(powerstat: PowerStat): void{
      this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: 1 });
  }
  remove(hero: Hero){
    this.removeHero.emit(hero);
  }
}
