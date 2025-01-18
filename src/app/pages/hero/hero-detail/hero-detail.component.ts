import { Component, OnChanges, computed, inject, input, numberAttribute } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Hero } from '../../../shared/interfaces/hero.interface';
import { HeroItemComponent } from "../../../components/hero-item/hero-item.component";
import { HeroItemNotFoundComponent } from '../../../components/hero-item-not-found/hero-item-not-found.component';
import { HeroService } from '../../../shared/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItemComponent, HeroItemNotFoundComponent, AsyncPipe],
  template: `
<!--TODO 718: Define a variable hero that is the result of the async operation hero$ using the pipe async.
              if hero is valid, display the app-hero-item component with the hero as input. Otherwise, display the app-hero-item-not-found component.
-->
@let hero = hero$ | async;
@if(hero){
  <app-hero-item [hero]="hero" [readonly]="true" />
}@else{
  <app-hero-item-not-found />
}`,
})
export class HeroDetailComponent implements OnChanges {
  id = input(0, { transform: numberAttribute });
  readonly #heroService = inject(HeroService);
 /* TODO 718: Remove the hero and isValid properties */

  hero$: Observable<Hero> = of();

  /* TODO 718: Implement the ngOnChanges lifecycle hook to update the hero$ observable.
  ngOnChanges(){
    this.hero$ = this.#heroService.findOne(this.id());
  }
  */
  ngOnChanges(){ // <- Important!
    this.hero$ = this.#heroService.findOne(this.id());
  }
}
