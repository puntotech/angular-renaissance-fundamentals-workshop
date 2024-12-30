import { Component, Signal, computed, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Hero } from '../../shared/interfaces/hero.interface';
import { heroNameValidator } from '../../shared/validators/hero-name.validator';

@Component({
  selector: 'app-hero-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent {
  hero = input<Hero>();
  add = output<Hero>({ alias: 'sendHero'});
  readonly #formBuilder = inject(FormBuilder);
  message = "";
  powerstats = ['combat', 'durability', 'intelligence', 'power', 'speed', 'strength'];

  readonly #defaultHero =   {
    id:  Math.floor(Math.random() * 10000) + 1000,
    name: 'Joker',
    image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/370-joker.jpg",
    alignment: 'bad',
    powerstats: {
      intelligence: 100,
      strength: 10,
      speed: 12,
      durability: 60,
      power: 43,
      combat: 70,
    }
  };

  heroSelected = computed(() => this.hero() ? this.hero()! : this.#defaultHero);
  textButton = computed(() => this.hero() ? 'Update': 'Create');


  heroForm: Signal<FormGroup> = computed(() => this.#formBuilder.group({
    name: [this.heroSelected().name, Validators.required, heroNameValidator],
      image: [this.heroSelected().image],
      alignment: ["bad"],
      powerstats: this.#formBuilder.group({
        intelligence: [this.heroSelected().powerstats.intelligence, [Validators.required, Validators.max(100), Validators.min(0)]],
        strength: [10, [Validators.required, Validators.max(100), Validators.min(0)]],
        speed: [12, [Validators.required, Validators.max(100), Validators.min(0)]],
        durability: [60, [Validators.required, Validators.max(100), Validators.min(0)]],
        power: [43, [Validators.required, Validators.max(100), Validators.min(0)]],
        combat: [70, [Validators.required, Validators.max(100), Validators.min(0)]],
      })
    })
  );

  saveHero(){
    if (this.heroForm().invalid) {
      this.message = "Please correct all errors and resubmit the form";
    } else {
      const hero: Hero = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...this.heroForm().value,
        powerstats: {...this.heroForm().value.powerstats },
      };
      console.log("Saving Hero", hero);
      this.add.emit(hero);
    }
  }

}
