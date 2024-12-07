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
  /*
  * TODO 202: Modify the hero object so that instead of being defined within the HeroItem component,
  * it is received as an input of type Required<Hero>.
  */
  hero = input.required<Hero>();

  /* TODO 205: Update isHeroVillain to be a computed signal instead of a boolean value.
                It should use this.hero().alignment.
*/
  isHeroVillain = computed(() => this.hero().alignment === "bad");

  decrementPowerStats(powerstat: PowerStat): void{
  /* TODO 203: Modify this.hero to access the value of the signal by using this.hero() */
    const value = this.hero().powerstats[powerstat];
    if(value > 0){
      this.hero().powerstats[powerstat]--;
    }
  }

  incrementPowerStats(powerstat: PowerStat): void{
  /* TODO 203: Modify this.hero to access the value of the signal by using this.hero() */
  const value = this.hero().powerstats[powerstat];
    if(value < 100){
      this.hero().powerstats[powerstat]++;
    }
  }
}
