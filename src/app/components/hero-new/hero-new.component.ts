import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Hero } from '../../shared/interfaces/hero.interface';

@Component({
  selector: 'app-hero-new',
  imports: [ReactiveFormsModule],
  templateUrl: './hero-new.component.html',
  styleUrl: './hero-new.component.scss'
})
export class HeroNewComponent {

  add = output<Hero>();

  /* TODO 301: Inject the `FormBuilder` service into a private, readonly attribute called `formBuilder`. */
  readonly #formBuilder = inject(FormBuilder);

  message = "";

  /* TODO 302: Create an attribute named `heroForm` of type `FormGroup`, initialized using `formBuilder` with the controls described in the code.

    name: 'Joker', required
    image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/370-joker.jpg"
    alignment: "bad"
    powerstats: This is a `FormGroup`:
      intelligence: 100, required, min 0 y max 100
      strength: 10, required, min 0 y max 100
      speed: 12, required, min 0 y max 100
      durability: 60, required, min 0 y max 100,
      power: 43, required, min 0 y max 100
      combat: 70, required min 0 y max 100
  */
  heroForm: FormGroup = this.#formBuilder.group({
    name: ['Joker', Validators.required],
    image: ["https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/370-joker.jpg"],
    alignment: ["bad"],
    powerstats: this.#formBuilder.group({
      intelligence: [100, [Validators.required, Validators.max(100), Validators.min(0)]],
      strength: [10, [Validators.required, Validators.max(100), Validators.min(0)]],
      speed: [12, [Validators.required, Validators.max(100), Validators.min(0)]],
      durability: [60, [Validators.required, Validators.max(100), Validators.min(0)]],
      power: [43, [Validators.required, Validators.max(100), Validators.min(0)]],
      combat: [70, [Validators.required, Validators.max(100), Validators.min(0)]],
    })
  });


  addHero(){
    /* TODO 302: Uncomment the `addHero` method code in the `hero-new.component.ts` component. */
    if (this.heroForm.invalid) {
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const hero: Hero = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...this.heroForm.value,
        powerstats: {...this.heroForm.value.powerstats },
      };
      console.log("Creating Hero", hero);
      this.add.emit(hero);
    }
  }

}
