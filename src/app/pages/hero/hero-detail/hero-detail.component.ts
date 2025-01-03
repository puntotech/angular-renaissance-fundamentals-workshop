import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-detail',
  imports: [],
  /* TODO 617: If isValidHero is true, render the HeroItem component with the hero and readonly attributes set to true. If isValidHero is false, render the HeroItemNotFound component.*/
  template: `<p>hero-detail works!</p>`,
})
export class HeroDetailComponent {
  /* TODO 617: Create an input attribute called 'id' with an initial value of 0, and a transformation function called 'numberAttribute' */
  /* TODO 617: Inject the HeroService */
  /* TODO 617: Create a computed property called 'hero' that returns the hero with the id */
  /* TODO 617: Create a computed property called 'isValidHero' that returns true if the hero is not null */
}
