import { Component } from '@angular/core';
import { Hero } from './shared/interfaces/hero.interface';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroNewComponent } from './components/hero-new/hero-new.component';

@Component({
  selector: 'app-root',
  imports: [HeroListComponent, HeroNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'workshop-fundamentals';
  public heroes: Hero[] = [
    {
      id: 620,
      name: "Spider-Man",
      powerstats: {
        intelligence: 90,
        strength: 55,
        speed: 67,
        durability: 75,
        power: 74,
        combat: 85
      },
      image: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/620-spider-man.jpg',
      alignment: "good",
    },
    {
      id: 225,
      name: "Doctor Octopus",
      powerstats: {
        intelligence: 94,
        strength: 48,
        speed: 33,
        durability: 40,
        power: 53,
        combat: 65
      },
      image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/225-doctor-octopus.jpg",
      alignment: "bad",
    },
    {
      id: 70,
      name: "Batman",
      powerstats: {
        intelligence: 100,
        strength: 26,
        speed: 27,
        durability: 50,
        power: 47,
        combat: 100
      },
      image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/70-batman.jpg",
      alignment: "good",
    },

    ];

    addHero(hero: Hero){
      this.heroes.push(hero);
    }
}
