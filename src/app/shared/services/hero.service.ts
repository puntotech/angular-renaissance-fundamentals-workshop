import { Hero, PowerStat } from '../interfaces/hero.interface';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroes: Hero[] = [
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
      image: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/620-spider-man.jpg',
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
      image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/225-doctor-octopus.jpg",
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
      image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/70-batman.jpg",
      alignment: "good",
    },

  ];
  readonly defaultHero: Hero =   {
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
  readonly NullHero: Hero = {
    id:  Math.floor(Math.random() * 10000) + 1000,
    name: 'Not Found',
    image: "./assets/img/hero-not-found.png",
    alignment: 'bad',
    powerstats: {
      intelligence: -1,
      strength: -1,
      speed: -1,
      durability: -1,
      power: -1,
      combat: -1,
    }
  };

  add(hero: Hero){
    this.heroes.push(hero);
  }
  updatePowerstat(hero: Hero, powerstat: PowerStat, value: number){
    hero.powerstats[powerstat] += value;
  }
  update(heroToUpdate: Hero) {
    this.heroes = this.heroes.map(hero => hero.id === heroToUpdate.id ? heroToUpdate: hero);
  }
  findAll(): Hero[] {
    return this.heroes;
  }
  findOne(id: number): Hero{
    return this.heroes.find(hero => hero.id === id) || this.NullHero;
  }
  isDefaultHero(hero: Hero): boolean {
    return hero.id === this.defaultHero.id;
  }
  isNullHero(hero: Hero): boolean {
    return hero.id === this.NullHero.id;
  }
}
