import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Hero } from '../../shared/interfaces/hero.interface';
import { heroNameValidator } from '../../shared/validators/hero-name.validator';

@Component({
  selector: 'app-hero-new',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-new.component.html',
  styleUrl: './hero-new.component.scss'
})
export class HeroNewComponent {

  add = output<Hero>();
  readonly #formBuilder = inject(FormBuilder);
  message = "";
  powerstats = ['combat', 'durability', 'intelligence', 'power', 'speed', 'strength'];

  heroForm: FormGroup = this.#formBuilder.group({
    name: ['Joker', Validators.required, heroNameValidator],
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
