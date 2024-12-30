import { Component, inject } from '@angular/core';

import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../shared/services/hero.service';

@Component({
  selector: 'app-home',
  imports: [HeroListComponent],
  template: `<app-hero-list [heroes]="heroes" />`,
})
export class HomeComponent {
  readonly #heroService = inject(HeroService);
  heroes = this.#heroService.findAll();
}
