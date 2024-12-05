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

   /* TODO 107: Create isHeroVillain to check if the hero's alignment is "bad" */
  isHeroVillain = this.hero.alignment === "bad";

  decrementPowerStats(powerstat: PowerStat): void{
    /*
    * TODO 104: Check if the powerstat is greater than 0 and decrement it.
    */
    const value = this.hero.powerstats[powerstat];
    if(value > 0){
      this.hero.powerstats[powerstat]--;
    }
  }

  incrementPowerStats(powerstat: PowerStat): void{
   /*
    * TODO 104: Check if the powerstat is less than 100 and increment it.
    */
    const value = this.hero.powerstats[powerstat];
    if(value < 100){
      this.hero.powerstats[powerstat]++;
    }
  }
}
