import { Component, inject } from '@angular/core';

import { Hero } from './shared/interfaces/hero.interface';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroNewComponent } from './components/hero-new/hero-new.component';
import { HeroService } from './shared/services/hero.service';

/* TODO 501: Include the header and footer components */
@Component({
  selector: 'app-root',
  imports: [HeroListComponent, HeroNewComponent],
  templateUrl: './app.component.html',
  /*  TODO 502: Remove the app.component.scss file */
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'workshop-fundamentals';
  readonly #heroService = inject(HeroService);
  heroes = this.#heroService.findAll();

  addHero(hero: Hero){
    this.#heroService.add(hero);
  }
}
