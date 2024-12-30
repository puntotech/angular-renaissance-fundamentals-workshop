import { Component, computed, input, output } from '@angular/core';
import { Hero, PowerStat } from '../../shared/interfaces/hero.interface';

import { CommonModule } from '@angular/common';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-item',
  /* TODO 606: Navigate to the view page (/hero/:id) and update page (/hero/update/:id) for each hero when clicking the navigation buttons. */
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-item.component.html',
})
export class HeroItemComponent {
  hero = input.required<Hero>();
  powerstatsChange = output<HeroPowerstatsChange>();
  isHeroVillain = computed(() => this.hero().alignment === "bad");

  decrementPowerStats(powerstat: PowerStat): void{
    this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: -1 });
  }

  incrementPowerStats(powerstat: PowerStat): void{
      this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: 1 });
  }
}
