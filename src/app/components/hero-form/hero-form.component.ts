import { Component, Signal, computed, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Hero } from '../../shared/interfaces/hero.interface';
import { HeroService } from '../../shared/services/hero.service';
import { heroNameValidator } from '../../shared/validators/hero-name.validator';

@Component({
  selector: 'app-hero-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent {
  /* TODO 613: The default value for the hero input should be the defaultHero object from HeroService.  */
  hero = input<Hero>();
  add = output<Hero>({ alias: 'sendHero'});
  readonly #formBuilder = inject(FormBuilder);
   message = "";
  powerstats = ['combat', 'durability', 'intelligence', 'power', 'speed', 'strength'];
  /* TODO 613: Remove #defaultHero since defaultHero from HeroService is being used.  */
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

  /* TODO 613: Remove heroSelected as it is no longer needed, and update the heroForm to use hero. */
  heroSelected = computed(() => this.hero() ? this.hero()! : this.#defaultHero);
  /* TODO 614: Create an attribute named textButton, which is a signal<string> containing either the word Update or Create depending on whether hero is the defaultHero */

  /* TODO 613: Adjust heroForm to use hero instead of heroSelected. */

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
