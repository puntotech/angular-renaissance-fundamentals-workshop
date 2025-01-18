import { Component, DestroyRef, effect, inject, input, numberAttribute, signal } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroItemComponent } from "../../../components/hero-item/hero-item.component";
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../../shared/services/hero.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItemComponent, HeroItemNotFoundComponent],
  template: `
<!-- TODO 736: Use the hero signal to display the hero in the template -->
@if(hero()){
  <app-hero-item [hero]="hero()" [readonly]="true" />
}@else{
  <app-hero-item-not-found />
}`,
})
export class HeroDetailComponent  {
  id = input(0, { transform: numberAttribute });
  readonly #heroService = inject(HeroService);
   /* TODO 736: Replace the observable with a `hero` signal with initial value `NullHero` from `heroService`. */
   hero = signal<Hero>(this.#heroService.NullHero);

  /* TODO 736: Replace ngOnChanges to constructor in which you subscribe to the hero service inside the  effect (signal) */
  /* TODO 736: Use the operator `takeUntilDestroyed` to unsubscribe from the observable when the component is destroyed */
  constructor(private destroyRef: DestroyRef) {
    effect(() => {
      this.#heroService.findOne(this.id()).pipe(
        takeUntilDestroyed(destroyRef),
      ).subscribe(
        {
          next: (_hero) => this.hero.set(_hero)
        }
      );
    });
  }
}
