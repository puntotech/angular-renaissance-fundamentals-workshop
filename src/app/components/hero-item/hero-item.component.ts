import { Component, computed, input } from '@angular/core';
import { Hero, PowerStat } from '../../shared/interfaces/hero.interface';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss']
})
export class HeroItemComponent {
  hero = input.required<Hero>();
  /* TODO 211: Add the `powerstatsChange` property using the `output` function and type it with `HeroPowerStatsChange`. */

  isHeroVillain = computed(() => this.hero().alignment === "bad");

  decrementPowerStats(powerstat: PowerStat): void{
  /* TODO 212: Modify the `decrementPowerStats` method so that it emits the object to `HeroListComponent` through the `powerstatsChange` property. */
      const value = this.hero().powerstats[powerstat];
    if(value > 0){
      this.hero().powerstats[powerstat]--;
    }
  }

  incrementPowerStats(powerstat: PowerStat): void{
  /* TODO 213: Modify the `incrementPowerStats` method so that it emits the object to `HeroListComponent` through the `powerstatsChange` property. */
    const value = this.hero().powerstats[powerstat];
    if(value < 100){
      this.hero().powerstats[powerstat]++;
    }
  }
}
