import { Hero, PowerStat } from '../interfaces/hero.interface';

import { Injectable } from '@angular/core';

/* TODO 711: Extiende la clase a la clase abstracta HeroServiceAbstract */
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  /* TODO 711: Elimina todas las propiedades puesto que los datos ya no estarán en el servicio */
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

  /* TODO 712: Injecta el servicio httpClient en una propiedad privada y de solo lectura llamada httpClient */


  /* TODO 713: Crea el método load el cual se conecta al this.API_ENDPOINT usando el verbo get. */


 /* TODO 714: Update the add method to use the httpClient to post a new hero to the API_ENDPOINT. */
  add(hero: Hero){
    this.heroes.push(hero);
  }

  /* TODO 716: Update  the updatePowerstat method to use the this.update method. */
  updatePowerstat(hero: Hero, powerstat: PowerStat, value: number){
    hero.powerstats[powerstat] += value;
  }

  /* TODO 715: Update the update method to use the httpClient to put the hero to the API_ENDPOINT. */
  update(heroToUpdate: Hero) {
    this.heroes = this.heroes.map(hero => hero.id === heroToUpdate.id ? heroToUpdate: hero);
  }

  /* TODO 717: Update the remove method to use the httpClient to delete the hero from the API_ENDPOINT. */
  remove(hero: Hero){
    const index = this.heroes.findIndex(_hero => _hero.id === hero.id);
    if(index !== -1){
      this.heroes.splice(index, 1);
    }
  }

  /* TODO 719: Update the findAll method to use the httpClient to get the heroes from the API_ENDPOINT. */
  findAll(): Hero[] {
    return this.heroes;
  }

  /* TODO 718: Update the findOne method to use the httpClient to get the hero from the API_ENDPOINT. */
  findOne(id: number): Hero{
    return this.heroes.find(hero => hero.id === id) || this.NullHero;
  }

}
