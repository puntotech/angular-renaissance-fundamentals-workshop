import { Hero, PowerStat } from '../../shared/interfaces/hero.interface';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  public hero : Hero = {
    id: 620,
    name: "Spider-Man",
    powerstats: {
      intelligence: 90,
      strength: 55,
      speed: 67,
      durability: 75,
      power: 74,
      combat: 85
    },
    image: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/620-spider-man.jpg',
    alignment: "good",
  };

  /* TODO 205: Update isHeroVillain to be a computed signal instead of a boolean value.
              It should use this.hero().alignment.
*/

  isHeroVillain = this.hero.alignment === "bad";

  decrementPowerStats(powerstat: PowerStat): void{
  /* TODO 203: Modify this.hero to access the value of the signal by using this.hero() */
    const value = this.hero.powerstats[powerstat];
    if(value > 0){
      this.hero.powerstats[powerstat]--;
    }
  }

  incrementPowerStats(powerstat: PowerStat): void{
  /* TODO 203: Modify this.hero to access the value of the signal by using this.hero() */
    const value = this.hero.powerstats[powerstat];
    if(value < 100){
      this.hero.powerstats[powerstat]++;
    }
  }
}
