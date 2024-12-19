import { Component, inject } from '@angular/core';

import { Hero } from './shared/interfaces/hero.interface';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroNewComponent } from './components/hero-new/hero-new.component';
import { HeroService } from './shared/services/hero.service';

@Component({
  selector: 'app-root',
  imports: [HeroListComponent, HeroNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'workshop-fundamentals';
  /* TODO 401: Inject the `HeroService` into a private, read-only attribute named `heroService`. */
  readonly #heroService = inject(HeroService);
  /* TODO 402: Store the result of invoking the `findAll()` method from the `HeroService` in a variable named `heroes` */
  heroes = this.#heroService.findAll();

  /* TODO 403: Call the `add` method of the HeroService. */
  addHero(hero: Hero){
    this.#heroService.add(hero);
  }
}
