import { Component, inject } from '@angular/core';

import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { Hero } from './shared/interfaces/hero.interface';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroNewComponent } from './components/hero-new/hero-new.component';
import { HeroService } from './shared/services/hero.service';

/* TODO 603: Import RouterOutlet to enable routing using router-outlet. Remove unnecessary code in the component after this update. */
@Component({
  selector: 'app-root',
  imports: [HeroListComponent, HeroNewComponent, HeaderComponent, FooterComponent],
  template: `
<div class="grid min-h-screen grid-rows-[auto_1fr_auto] grid-cols-2 max-w-screen-2xl justify-between mx-auto pt-4">
  <app-header class="col-span-3"/>

  <app-hero-list [heroes]="heroes" class="col-span-2" />
  <app-hero-new (add)="addHero($event)" class="col-span-1"/>

  <app-footer class="col-span-3" />
</div>`
})
export class AppComponent {
  title = 'workshop-fundamentals';
  readonly #heroService = inject(HeroService);
  heroes = this.#heroService.findAll();

  addHero(hero: Hero){
    this.#heroService.add(hero);
  }
}
